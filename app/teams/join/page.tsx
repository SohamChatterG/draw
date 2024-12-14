// "use client";

// import React, { useState } from "react";
// import { joinTeam } from "@/convex/functions/teams"; // Ensure this path is correct
// import toast from "react-hot-toast";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// function Join() {
//   const [teamId, setTeamId] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [isLoading, setIsLoading] = useState(false); // Loading state
//   const router = useRouter();

//   // const handleJoinTeam = async () => {
//   //   if (!teamId || !email) {
//   //     toast.error("Please fill out all fields");
//   //     return;
//   //   }

//   //   setIsLoading(true); // Start loading
//   //   try {
//   //     //@ts-ignore
//   //     const response = await joinTeam(teamId, email );
//   //     console.log("ream n mail",teamId,email)
//   //     if (response) { // Adjust based on your API response
//   //       toast.success("Successfully joined the team!");
//   //       router.push("/dashboard");
//   //     } else {
//   //       toast.error(response?.message || "Failed to join the team");
//   //     }
//   //   } catch (error) {
//   //     console.log("Error joining team:", error);
//   //     toast.error("An error occurred while joining the team");
//   //   } finally {
//   //     setIsLoading(false); // End loading
//   //   }
//   // };

//   const { user } = useKindeBrowserClient() as { user: User };
//   const joinTeam = useMutation(api.functions.teams.joinTeam)


//   const createNewTeam=()=>{
//       joinTeam({
//         //@ts-ignore
//           teamId:teamId,
//           email:user?.email,
//       })
//       .then(resp=>{
//           if(resp){
//               console.log('Team joined response:', resp);
//               toast.success('Team joined succesfully')
//               router.push('/dashboard')
//           } else{
//               toast.error('Failed to create team. Please try again.');
//           }
//       })
//       .catch(error => {
//           console.error('Error creating team:', error);
//           toast.error('An error occurred while creating the team.');
//       });
//   }


//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Join a Team</h2>
      
//         <div>
//           <label htmlFor="teamId">Team ID:</label>
//           <input
//             type="text"
//             id="teamId"
//             value={teamId}
//             onChange={(e) => setTeamId(e.target.value)}
//             placeholder="Enter Team ID"
//             required
        
//           />
//         </div>
        
//         <Button
//                 className="bg-blue-500 text-white m-5 hover:bg-blue-200"
//                 // disabled={!(teamName && teamName.length > 0)}
//                 onClick={()=>{
//                     createNewTeam()
//                 }}
//             >
//                 Join team
//             </Button>
    
//     </div>
//   );
// }

// export default Join;


// "use client";

// import React, { useState } from "react";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// function Join() {
//   const [teamId, setTeamId] = useState("");
//   const router = useRouter();
//   const { user } = useKindeBrowserClient() as { user: User };

//   // Convex mutation for adding membership
//   const addMembership = useMutation(api.functions.membership.addMembership);

//   const handleJoinTeam = async () => {
//     if (!teamId || !user?.email) {
//       toast.error("Please provide a valid Team ID and ensure you're logged in.");
//       return;
//     }

//     try {
//       // Call the addMembership mutation
//       await addMembership({
//         email: user.email,
//         teamId,
//       });

//       toast.success("Successfully joined the team!");
//       router.push("/dashboard"); // Redirect to dashboard after joining
//     } catch (error) {
//       console.error("Error joining team:", error);
//       toast.error(error?.message || "Failed to join the team. Please try again.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Join a Team</h2>
//       <div>
//         <label htmlFor="teamId">Team ID:</label>
//         <input
//           type="text"
//           id="teamId"
//           value={teamId}
//           onChange={(e) => setTeamId(e.target.value)}
//           placeholder="Enter Team ID"
//           required
//         />
//       </div>
//       <Button
//         className="bg-blue-500 text-white m-5 hover:bg-blue-200"
//         onClick={handleJoinTeam}
//       >
//         Join Team
//       </Button>
//     </div>
//   );
// }

// export default Join;


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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
  email: string;
}

function Join() {
  const [teamId, setTeamId] = useState("");
  const { user } = useKindeBrowserClient() as { user: User };
  const addMembership = useMutation(api.functions.membership.addMembership);
  const router = useRouter();

  const handleJoinTeam = async () => {
    if (!teamId || !user?.email) {
      toast.error("Please provide a valid Team ID and ensure you're logged in.");
      return;
    }

    try {
      await addMembership({
        email: user.email,
        //@ts-ignore
        teamId,
      });

      toast.success("Successfully joined the team!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error joining team:", error);
      //@ts-ignore
      toast.error(error?.message || "Failed to join the team. Please try again.");
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
          <h2 className="font-bold text-[40px] py-3">Join a Team</h2>
          <h2 className="text-gray-500 text-[20px]">
            Enter your Team ID to get started
          </h2>
          <div className="mt-7 w-full">
            <label htmlFor="teamId" className="text-gray-400 text-[20px] ml-2">
              Team ID
              <Input
                id="teamId"
                name="teamId"
                placeholder="Team ID"
                className="mt-3 text-[18px]"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
              />
            </label>
          </div>
          <Button
            className="bg-blue-500 text-white m-5 hover:bg-blue-200"
            disabled={!(teamId && teamId.length > 0)}
            onClick={handleJoinTeam}
          >
            Join Team
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Join;
