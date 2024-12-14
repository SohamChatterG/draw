
// import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
// import { Separator } from '@/components/ui/separator'
// import { useConvex } from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'

// export interface TEAM{
//     createdBy:String,
//     teamName:String,
//     _id:String
// }
// export default function SideNavTopSection({user,setActiveTeamInfo}:any) {
//     const menu=[
//         {
//             id:1,
//             name:'Create Team',
//             path:'/teams/create',
//             icon:Users
//         },
//         {
//             id:2,
//             name:'Join Team',
//             path:'/teams/join',
//             icon:Users
//         },
//         {
//             id:3,
//             name:'Settings',
//             path:'',
//             icon:Settings
//         }
//     ];
//     const router=useRouter();
//     const convex=useConvex();
//     const [activeTeam,setActiveTeam]=useState<TEAM>();
//     const [teamList,setTeamList]=useState<TEAM[]>();
//     useEffect(()=>{
//         if(!user) return;
//         console.log('printing user',user)
//         user&&getTeamList();  // make sure user is defined and not null or undefined
//     },[user])

//     useEffect(()=>{
//         activeTeam&&setActiveTeamInfo(activeTeam)
//     })
    
//     const getTeamList=async()=>{
//         const result =await convex.query(api.functions.membership.getTeamsForUser,{email:user?.email})
//         console.log("TeamList",result);
//         setTeamList(result);
//         setActiveTeam(result[0]);
//     }

//     const onMenuClick=(item:any)=>{
//         if(item.path)
//         {
//             router.push(item.path);
//         }
//     }
    
//     useEffect(()=>{
//         console.log('consoling the team list from use effect',teamList,'      ',activeTeam)
//     },[teamList])

//     return (
//         <div>
//            <Image src='/logo-1.png' alt='logo'
//                         width={50}
//                         height={50} 
//             />
//         <Popover>
//             <PopoverTrigger>
//                 <div className='flex items-center gap-3'>
//                     <div className='flex flex-col'>
                
//                     <h2 className='flex mt-5 gap-5 items-center
//       font-bold text-[17px] hover:bg-slate-200 p-3 rounded-lg
//       cursor-pointer
//       '>{activeTeam?.teamName}
//                         <ChevronDown />
//                     </h2>
//                 </div>
                    

//                 </div>
//             </PopoverTrigger>
//             <PopoverContent className='ml-7 p-4'>
//                {/* Team Section  */}
//                 <div>
//                     {teamList&&teamList?.map((team,index)=>(
//                         <h2 key={index}
//                         className={`${activeTeam?._id!=team._id&&'p-2 hover:bg-blue-100 hover:text-white rounded-lg mb-1 cursor-pointer'}
//                          ${activeTeam?._id==team._id&&'bg-blue-500 text-white p-2 rounded-lg mb-1 cursor-pointer'}`}
//                          onClick={()=>setActiveTeam(team)}
//                         >{team.teamName}</h2>
//                     ))}
                    
//                 </div>
//                 <Separator className='mt-2 bg-slate-100'/>
//                 {/* Option Section  */}
//                 <div>
//                     {menu.map((item,index)=>(
//                         <h2 key={index} className='flex gap-2 items-center
//                         p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm'
//                         onClick={()=>onMenuClick(item)}>
//                             <item.icon className='h-4 w-4'/>
//                             {item.name}</h2>
//                     ))}
//                     <LogoutLink>
//                     <h2 className='flex gap-2 items-center
//                         p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm'>
//                             <LogOut className='h-4 w-4'/>
//                             Logout</h2>
//                         </LogoutLink>
//                 </div>
//                 <Separator className='mt-2 bg-slate-100'/>
//                 {/* User Info Section  */}
//                {user&& <div className='mt-2 flex gap-2 items-center'>
//                     <Image src={user?.picture || null} alt='user'
//                     width={30}
//                     height={30}
//                     className='rounded-full'
//                     />
//                     <div>
//                         <h2 className='text-[14px] font-bold'>{user?.given_name} {user?.family_name}</h2>
//                         <h2 className='text-[12px] text-gray-500'>{user?.email}</h2>

//                     </div>
//                 </div>}
//             </PopoverContent>
//         </Popover>

//         {/* All File Button  */}
//         <Button variant='outline'
//          className='w-full justify-start
//           gap-2 font-bold mt-8 bg-gray-100'>
//             <LayoutGrid className='h-5 w-5'/>
//             All Files</Button>
//         </div>

//     )
// }





import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { Separator } from '@/components/ui/separator';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

export default function SideNavTopSection({ user, setActiveTeamInfo }: any) {
  const menu = [
    {
      id: 1,
      name: 'Create Team',
      path: '/teams/create',
      icon: Users,
    },
    {
      id: 2,
      name: 'Join Team',
      path: '/teams/join',
      icon: Users,
    },
    {
      id: 3,
      name: 'Settings',
      path: '',
      icon: Settings,
    },
  ];
  
  const router = useRouter();
  const convex = useConvex();
  const [activeTeam, setActiveTeam] = useState<TEAM | null>(null);
  const [teamList, setTeamList] = useState<TEAM[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;
    console.log('Printing user', user);
    getTeamList(); // Fetch teams once the user is available
  }, [user]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam);
    }
  }, [activeTeam, setActiveTeamInfo]);

//   const getTeamList = async () => {
//     try {
//       setLoading(true); // Start loading state
//       const result = await convex.query(api.functions.membership.getTeamsForUser, { email: user?.email });
//       console.log("TeamList", result);
//       setTeamList(result || []);
//       setActiveTeam(result?.[0] || null); // Set the first team as the active team if available
//     } catch (error) {
//       console.error("Error fetching teams:", error);
//     } finally {
//       setLoading(false); // End loading state
//     }
//   };


/////////////////////////


useEffect(() => {
    if (activeTeam) {
      setActiveTeamInfo(activeTeam); // Existing functionality
      localStorage.setItem('activeTeam', JSON.stringify(activeTeam)); // Save to localStorage
    }
  }, [activeTeam, setActiveTeamInfo]);
  





const getTeamList = async () => {
    try {
      setLoading(true); // Start loading state
  
      const result = await convex.query(api.functions.membership.getTeamsForUser, { email: user?.email });
      console.log("TeamList", result);
      setTeamList(result || []);
  
      // Check localStorage for the last active team
      const savedActiveTeam = localStorage.getItem('activeTeam');
      if (savedActiveTeam) {
        const parsedTeam = JSON.parse(savedActiveTeam);
        const isTeamStillValid = result?.some((team) => team.id === parsedTeam.id); // Validate team exists in current list
  
        if (isTeamStillValid) {
          setActiveTeam(parsedTeam); // Restore from localStorage
        } else {
          setActiveTeam(result?.[0] || null); // Default to the first team if the saved team is no longer valid
          localStorage.removeItem('activeTeam'); // Clear invalid team
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
  


////////////////////////




  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <div>
      <Image
        src='/logo-1.png'
        alt='logo'
        width={50}
        height={50}
      />
      <Popover>
        <PopoverTrigger>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <h2 className='flex mt-5 gap-5 items-center
                font-bold text-[17px] hover:bg-slate-200 p-3 rounded-lg
                cursor-pointer'>
                {activeTeam ? activeTeam.teamName : "Select a Team"}
                <ChevronDown />
              </h2>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className='ml-7 p-4'>
          {/* Team Section */}
          {loading ? (
            <p>Loading teams...</p>
          ) : (
            <div>
              {teamList?.length > 0 ? (
                teamList.map((team, index) => (
                  <h2
                    key={index}
                    className={`${activeTeam?._id !== team._id && 'p-2 hover:bg-blue-100 hover:text-white rounded-lg mb-1 cursor-pointer'}
                      ${activeTeam?._id === team._id && 'bg-blue-500 text-white p-2 rounded-lg mb-1 cursor-pointer'}`}
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
          <Separator className='mt-2 bg-slate-100' />
          {/* Option Section */}
          <div>
            {menu.map((item, index) => (
              <h2
                key={index}
                className='flex gap-2 items-center
                p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm'
                onClick={() => onMenuClick(item)}
              >
                <item.icon className='h-4 w-4' />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2 className='flex gap-2 items-center
                p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm'>
                <LogOut className='h-4 w-4' />
                Logout
              </h2>
            </LogoutLink>
          </div>
          <Separator className='mt-2 bg-slate-100' />
          {/* User Info Section */}
          {user && (
            <div className='mt-2 flex gap-2 items-center'>
              <Image
                src={user?.picture || ''}
                alt='user'
                width={30}
                height={30}
                className='rounded-full'
              />
              <div>
                <h2 className='text-[14px] font-bold'>{user?.given_name} {user?.family_name}</h2>
                <h2 className='text-[12px] text-gray-500'>{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* All Files Button */}
      <Button
        variant='outline'
        className='w-full justify-start
          gap-2 font-bold mt-8 bg-gray-100'
      >
        <LayoutGrid className='h-5 w-5' />
        All Files
      </Button>
    </div>
  );
}
