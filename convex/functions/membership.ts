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
    email: v.string(), // User's email instead of userId
  },
  handler: async (ctx, args) => {
    // Fetch the user's userId using their email
    const user = await ctx.db
      .query("user")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    // Fetch all memberships for the user
    const memberships = await ctx.db
      .query("memberships")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    const teamIds = memberships.map(membership => membership.teamId);

    // Fetch teams by matching teamIds using Promise.all
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
    // Fetch all memberships for the team

    const memberships = await ctx.db.query("memberships")
      .filter(q => q.eq(q.field("teamId"), args.teamId))
      .collect();

    // Get the user IDs from the memberships
    const userIds = memberships.map(membership => membership.userId);

    // Fetch all users by their IDs
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