// "use client"
// import React, { useState } from 'react';
// import Image from 'next/image';
// import logo from '@/public/logo-1.png';
// import teamwork from '@/public/teamwork2.jpg';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useMutation } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';


// interface User {
//     email: string;
// }



// function Page() {
  

//     const { user } = useKindeBrowserClient() as { user: User };
//     const [teamName, setTeamName] = useState('');
//     const createTeam = useMutation(api.functions.teams.createTeam)
//     const router = useRouter();
//     const createNewTeam=()=>{
//         createTeam({
//             teamName:teamName,
//             createdBy:user?.email,
//         })
//         .then(resp=>{
//             if(resp){
//                 console.log('Team creation response:', resp);
//                 toast.success('Team created succesfully')
//                 router.push('/dashboard')
//             } else{
//                 toast.error('Failed to create team. Please try again.');
//             }
//         })
//         .catch(error => {
//             console.error('Error creating team:', error);
//             toast.error('An error occurred while creating the team.');
//         });
//     }
//     return (
//         <div
//         className="bg-cover bg-center px-6 md:px-16 my-16 h-screen w-screen flex items-center justify-center"
//         style={{
//             backgroundImage: `url(${teamwork.src})`, // Use `teamwork.src` for Next.js Image
//         }}
//         >
//         <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-xl">
//             <Image src={logo} alt="logo" width={200} height={200} />
//             <div className="flex flex-col items-center mt-8">
//             <h2 className="font-bold text-[40px] py-3">
//                 Go have a cool team name for your team
//             </h2>
//             <h2 className="text-gray-500 text-[20px]">
//                 You can always change this later
//             </h2>
//             <div className="mt-7 w-full">
//                 <label htmlFor="input" className="text-gray-400 text-[20px] ml-2">
//                 Team Name
//                 <Input
//                     name="input"
//                     placeholder="Team Name"
//                     className="mt-3 text-[18px]"
//                     onChange={(e) => {
//                         setTeamName(e.target.value);
//                     }}
//                 />
//                 </label>
//             </div>
//             <Button
//                 className="bg-blue-500 text-white m-5 hover:bg-blue-200"
//                 disabled={!(teamName && teamName.length > 0)}
//                 onClick={()=>{
//                     createNewTeam()
//                 }}
//             >
//                 Click
//             </Button>
//             </div>
//         </div>
//         </div>
//     );
// }

// export default Page;


"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo-1.png";
import teamwork from "@/public/teamwork2.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  email: string;
}

function Page() {
  const { user } = useKindeBrowserClient() as { user: User };
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.functions.teams.createTeam);
  const addMembership = useMutation(api.functions.membership.addMembership);
  const router = useRouter();

  const createNewTeam = async () => {
    if (!user?.email) {
      toast.error("User email not found. Please log in.");
      return;
    }

    try {
      // Create the team
      const team = await createTeam({
        teamName: teamName,
        createdBy: user.email,
      });

      if (team) {
        console.log("Team creation response:", team);
        toast.success("Team created successfully");

        // Add membership for the creator
        try {
          await addMembership({
            email: user.email,
            teamId: team, // Assuming `team._id` is returned from the backend
          });
          toast.success("Membership created for the team creator");
          router.push("/dashboard");
        } catch (membershipError) {
          console.error("Error creating membership:", membershipError);
          toast.error(
            "Team created, but failed to add creator to the team. Please contact support."
          );
        }
      } else {
        toast.error("Failed to create team. Please try again.");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("An error occurred while creating the team.");
    }
  };

  return (
    <div
      className="bg-cover bg-center px-6 md:px-16 my-16 h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${teamwork.src})`, // Use `teamwork.src` for Next.js Image
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-xl">
        <Image src={logo} alt="logo" width={200} height={200} />
        <div className="flex flex-col items-center mt-8">
          <h2 className="font-bold text-[40px] py-3">
            Go have a cool team name for your team
          </h2>
          <h2 className="text-gray-500 text-[20px]">
            You can always change this later
          </h2>
          <div className="mt-7 w-full">
            <label htmlFor="input" className="text-gray-400 text-[20px] ml-2">
              Team Name
              <Input
                name="input"
                placeholder="Team Name"
                className="mt-3 text-[18px]"
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
              />
            </label>
          </div>
          <Button
            className="bg-blue-500 text-white m-5 hover:bg-blue-200"
            disabled={!(teamName && teamName.length > 0)}
            onClick={createNewTeam}
          >
            Click
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
