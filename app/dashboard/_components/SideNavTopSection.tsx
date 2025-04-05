import {
  ChevronDown,
  LayoutGrid,
  LogOut,
  Copy,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation } from "convex/react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

export default function SideNavTopSection({ user, setActiveTeamInfo }: any) {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Join Team",
      path: "/teams/join",
      icon: Users,
    },
    {
      id: 3,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM | null>(null);
  const [teamList, setTeamList] = useState<TEAM[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (!user) return;
    getTeamList();
  }, [user]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam);
    }
  }, [activeTeam, setActiveTeamInfo]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam);
      localStorage.setItem("activeTeam", JSON.stringify(activeTeam));
    }
  }, [activeTeam, setActiveTeamInfo]);

  const getTeamList = async () => {
    try {
      setLoading(true);

      const result = await convex.query(
        api.functions.membership.getTeamsForUser,
        { email: user?.email }
      );
      console.log("TeamList", result);
      setTeamList(result || []);

      // Check localStorage for the last active team
      const savedActiveTeam = localStorage.getItem("activeTeam");
      if (savedActiveTeam) {
        const parsedTeam = JSON.parse(savedActiveTeam);
        const isTeamStillValid = result?.some(
          (team) => team.id === parsedTeam.id
        );

        if (isTeamStillValid) {
          setActiveTeam(parsedTeam);
        } else {
          setActiveTeam(result?.[0] || null);
          localStorage.removeItem("activeTeam");
        }
      } else {
        setActiveTeam(result?.[0] || null); // Default to the first team if no saved team exists
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };
  const leaveTeam = useMutation(api.functions.membership.leaveTeam);

  const handleRemoveTeam = async (teamId: string) => {
    try {
      await leaveTeam({
        email: user?.email,
        teamId,
      });

      toast.success("Left team successfully");

      getTeamList(); // Refresh team list
    } catch (error: any) {
      toast.error(error.message || "Failed to leave team");
    }
  };


  const handleCopy = () => {
    if (activeTeam?._id) {
      navigator.clipboard
        .writeText(activeTeam._id)
        .then(() => {
          toast("team id copied");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };
  const avatarColors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-purple-500", "bg-yellow-500"];


  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  useEffect(() => {

    const getTeamMembers = async (teamId) => {
      try {
        const members = await convex.query(api.functions.membership.getTeamMembers, { teamId });
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
    if (activeTeam) {
      getTeamMembers(activeTeam._id)
    }
  }, [activeTeam])


  return (
    <div>
      <Image src="/draw.jpg" alt="logo" width={50} height={50} />
      <Popover>
        <button onClick={handleCopy} title="Copy Team ID" className="hover:text-blue-600 transition mr-2">
          <Copy className="w-4 h-4" />
        </button>


        <PopoverTrigger>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h2
                className="flex mt-5 gap-3 items-center text-[16px] px-4 py-2 rounded-xl bg-white/60 backdrop-blur-md shadow-md border border-gray-200 transition hover:shadow-lg group"
              >
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {activeTeam ? activeTeam.teamName : "Select a Team"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:translate-y-1 transition-transform duration-300" />
              </h2>

            </div>
          </div>
        </PopoverTrigger>
        <div></div>
        <PopoverContent className="ml-7 p-4 bg-slate-50">
          {/* Team Section */}
          {loading ? (
            <p>Loading teams...</p>
          ) : (
            <div>
              {teamList?.length > 0 ? (
                teamList.map((team, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-2 mb-1 rounded-lg cursor-pointer transition-all 
        ${activeTeam?._id === team._id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-100 hover:text-black"
                      }`}
                  >
                    <h2
                      onClick={() => setActiveTeam(team)}
                      className="flex-1"
                    >
                      {team.teamName}
                    </h2>
                    {activeTeam?._id !== team._id && (
                      <div className="relative group">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevent triggering setActiveTeam
                            handleRemoveTeam(team._id);
                          }}
                          className="p-1 hover:text-red-500 transition-transform transform hover:scale-110"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                        {/* Tooltip */}
                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Leave Team
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No teams available</p>
              )}

            </div>
          )}
          <Separator className="mt-2 bg-slate-100" />
          {/* Option Section */}
          <div>
            {menu.map((item, index) => (
              <h2
                key={index}
                className="flex gap-2 items-center
                p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                onClick={() => onMenuClick(item)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2
                className="flex gap-2 items-center
                p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </h2>
            </LogoutLink>
          </div>
          <Separator className="mt-2 bg-slate-100" />
          {/* User Info Section */}
          {user && (
            <div className="mt-2 flex gap-2 items-center">
              <Image
                src={user?.picture || ""}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div>
                <h2 className="text-[14px] font-bold">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* All Files Button */}
      <Button
        variant="outline"
        className="w-full justify-start
          gap-2 font-bold mt-8 bg-gray-100"
      >
        <LayoutGrid className="h-5 w-5" />
        All Files
      </Button>
      <div className="mt-4 bg-white shadow-lg rounded-lg p-4">
        <h3 className="font-semibold text-lg text-gray-800 border-b pb-2 mb-3">Team Members</h3>
        {teamMembers.length > 0 ? (
          <ul className={`space-y-2 ${teamMembers.length > 3 ? 'max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300' : ''}`}>
            {teamMembers.map((member, index) => (
              <li key={index} className="flex items-center space-x-3 p-2">
                <div className={`w-8 h-8 text-white flex items-center justify-center rounded-full text-sm font-medium ${avatarColors[index % avatarColors.length]}`}>
                  {member?.name?.charAt(0).toUpperCase()}
                </div>
                <div title={member.name} className="hover:bg-gray-100">
                  {member?.name?.length > 10 ? member.name.slice(0, 10) + "..." : member.name}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No members found</p>
        )}
      </div>


    </div>
  );
}
