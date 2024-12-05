import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export default async function middleware(req:NextRequest) {
  return withAuth(req, {
    isReturnToCurrentPage: true
  });
}
export const config = {
    // const {isAuthenticated} = getKindeServerSession
    // if (!await isAuthenticated()){
    //     return NextResponse.redirect(new URL('/dashboard'))
    // }
    matcher: ["/dashboard"]
};