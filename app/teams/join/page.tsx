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
import useHash from "@/app/hooks/useHash";

interface User {
  email: string;
}

function Join() {
  const [inputVal, setInputVal] = useState("");
  const [teamId, setTeamId] = useState("");
  const { user } = useKindeBrowserClient() as { user: User };
  const addMembership = useMutation(api.functions.membership.addMembership);
  const router = useRouter();
  const { getOriginal } = useHash();
  const handleJoinTeam = async () => {
    const a = getOriginal(inputVal);
    console.log("a", a);
    setTeamId(a);
    if (!teamId || !user?.email) {
      toast.error(
        "Please provide a valid Team ID and ensure you're logged in."
      );
      return;
    }

    try {
      await addMembership({
        email: user.email,
        //@ts-expect-error
        teamId,
      });

      toast.success("Successfully joined the team!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error joining team:", error);
      toast.error(
        error?.message || "Failed to join the team. Please try again."
      );
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
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </label>
          </div>
          <Button
            className="bg-blue-500 text-white m-5 hover:bg-blue-200"
            disabled={!(inputVal && inputVal.length > 0)}
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
