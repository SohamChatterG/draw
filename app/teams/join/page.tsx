"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/draw.jpg";
import { Loader2 } from "lucide-react";
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
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useKindeBrowserClient() as { user: User };
  const addMembership = useMutation(api.functions.membership.addMembership);
  const router = useRouter();
  const handleJoinTeam = async () => {



    try {
      setLoading(true)
      await addMembership({
        email: user.email,
        //@ts-expect-error
        teamId: inputVal,
      });

      toast.success("Successfully joined the team!");
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false)
      console.log("Error joining team:", error);
      toast(
        error?.message || "Failed to join the team. Please try again."
      );
    }
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url("/join_team2.png")`,
      }}
    >
      {/* Optional overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

      {/* Content */}
      <div className="relative z-10 text-white flex flex-col items-center">
        <Image src={logo} alt="logo" width={120} height={120} className="mb-6" />
        <h2 className="font-bold text-4xl md:text-5xl mb-2 drop-shadow-lg">Join a Team</h2>
        <p className="text-lg md:text-xl mb-6 text-gray-100 drop-shadow-md">
          Enter your Team ID to get started
        </p>

        <div className="w-[280px] md:w-[360px]">
          <label htmlFor="teamId" className="block text-gray-100 text-lg mb-1 ml-1">
            Team ID
          </label>
          <Input
            id="teamId"
            name="teamId"
            placeholder="Team ID"
            className="text-[16px] px-4 py-2 rounded-md border-none shadow-md bg-white text-black w-full"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>

        <Button
          className="bg-blue-500 text-white mt-5 px-6 py-2 rounded-md hover:bg-blue-600 shadow-md"
          disabled={!inputVal}
          onClick={handleJoinTeam}
        >
          {
            !loading ? ("Join Team") : <Loader2 className="animate-spin h-5 w-5 text-white" />
          }
        </Button>
      </div>
    </div>
  );

}

export default Join;
