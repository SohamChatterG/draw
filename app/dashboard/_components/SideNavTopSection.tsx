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
    getTeamList(); // Fetch teams once the user is available
  }, [user]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam);
    }
  }, [activeTeam, setActiveTeamInfo]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam); // Existing functionality
      localStorage.setItem("activeTeam", JSON.stringify(activeTeam)); // Save to localStorage
    }
  }, [activeTeam, setActiveTeamInfo]);

  const getTeamList = async () => {
    try {
      setLoading(true); // Start loading state

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
        ); // Validate team exists in current list

        if (isTeamStillValid) {
          setActiveTeam(parsedTeam); // Restore from localStorage
        } else {
          setActiveTeam(result?.[0] || null); // Default to the first team if the saved team is no longer valid
          localStorage.removeItem("activeTeam"); // Clear invalid team
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
  /////////////
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




  ///////////



  return (
    <div>
      <Image src="/logo-1.png" alt="logo" width={50} height={50} />
      <Popover>
        <button onClick={handleCopy} className="">
          <Copy />
        </button>
        <PopoverTrigger>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h2
                className="flex mt-5 gap-5 items-center
                font-bold text-[17px] hover:bg-slate-200 p-3 rounded-lg
                cursor-pointer"
              >
                {activeTeam ? activeTeam.teamName : "Select a Team"}
                <ChevronDown />
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
                  <h2
                    key={index}
                    className={`${activeTeam?._id !== team._id && "p-2 hover:bg-blue-100 hover:text-white rounded-lg mb-1 cursor-pointer"}
                      ${activeTeam?._id === team._id && "bg-blue-500 text-white p-2 rounded-lg mb-1 cursor-pointer"}`}
                    onClick={() => setActiveTeam(team)}
                  >
                    {team.teamName}
                  </h2>
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
                <span className="text-gray-700 font-medium">{member?.name}</span>
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
