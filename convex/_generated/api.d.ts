/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as functions_files from "../functions/files.js";
import type * as functions_membership from "../functions/membership.js";
import type * as functions_teams from "../functions/teams.js";
import type * as functions_user from "../functions/user.js";
import type * as public from "../public.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "functions/files": typeof functions_files;
  "functions/membership": typeof functions_membership;
  "functions/teams": typeof functions_teams;
  "functions/user": typeof functions_user;
  public: typeof public;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
