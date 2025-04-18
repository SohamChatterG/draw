import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Mutation to add membership
export const addMembership = mutation({
  args: {
    email: v.string(), // User's email instead of userId
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    // Fetch the user's userId using their email
    const user = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    // Check if the membership already exists
    const existingMembership = await ctx.db
      .query("memberships")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .first();

    if (existingMembership) {
      throw new Error("Membership already exists");
    }

    // Insert the membership
    const result = await ctx.db.insert("memberships", { userId, teamId: args.teamId });
    return result;
  },
});


export const getTeamsForUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("user")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    const memberships = await ctx.db
      .query("memberships")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    const teamIds = memberships.map(membership => membership.teamId);

    const teams = await Promise.all(
      teamIds.map(teamId => ctx.db.get(teamId))
    );

    return teams.filter(team => team !== null); // Filter out any null results
  },
});

export const getTeamMembers = query({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {

    const memberships = await ctx.db.query("memberships")
      .filter(q => q.eq(q.field("teamId"), args.teamId))
      .collect();

    const userIds = memberships.map(membership => membership.userId);

    const users = await Promise.all(
      userIds.map(userId => ctx.db.get(userId))
    );

    // Filter out null users and return user information including names
    return users
      .filter(user => user !== null)
      .map(user => ({
        name: user.name,
        email: user.email,
        image: user.image,
        userId: user._id
      }));
  },
});

export const leaveTeam = mutation({
  args: {
    email: v.string(),
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    // Find the user by email
    const user = await ctx.db
      .query("user")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    const membership = await ctx.db
      .query("memberships")
      .filter(q => q.eq(q.field("userId"), userId))
      .filter(q => q.eq(q.field("teamId"), args.teamId))
      .first();

    if (!membership) {
      throw new Error("Membership not found");
    }

    await ctx.db.delete(membership._id);

    return { success: true, message: "Successfully left the team" };
  },
});
