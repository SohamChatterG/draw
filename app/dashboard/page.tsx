"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Header from "./_components/Header";
import FileList from "./_components/FileList";
const Dashboard = () => {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient(); // consider defining a more specific type
  const createUser = useMutation(api.functions.user.createUser);

  const checkUser = async () => {
    const result = await convex.query(api.functions.user.getUser, {
      email: user?.email,
    });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((resp) => {
        console.log(resp);
      });
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  return (
    <div className="p-8">
      <Header />
      {user && <FileList />}
    </div>
  );
};

export default Dashboard;
