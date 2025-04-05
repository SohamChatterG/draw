"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
interface User {
  email: string;
}

function Create() {
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
        setLoading(false);

      } else {
        setLoading(false);
        toast.error("Failed to create team. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating team:", error);
      toast.error("An error occurred while creating the team.");
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url('/create_team.png')`,
      }}
    >
      <div className="text-center text-white px-6 md:px-16 max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
          Let’s Create Your Team
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-200 drop-shadow-sm">
          You can always change this later
        </p>

        <div className="flex flex-col items-center">
          <label htmlFor="teamName" className="text-lg text-white self-start ml-1 mb-1">
            Team Name
          </label>
          <Input
            name="teamName"
            placeholder="Enter your team name"
            className="text-black text-lg mb-6 w-full bg-white/80"
            onChange={(e) => setTeamName(e.target.value)}
          />

          <Button
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 text-lg rounded transition-all"
            disabled={!(teamName && teamName.length > 0) || loading}
            onClick={createNewTeam}
          >
            {!loading ? 'Let’s Go' : <Loader2 className="animate-spin h-5 w-5 text-white" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Create;
