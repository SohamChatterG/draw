import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archieve: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("files", args);
    return result;
  },
});

export const getFiles = query({
  args: {
    teamId: v.optional(v.string()), // Use `v.optional` to make it optional
  },
  handler: async (ctx, args) => {
    const queryBuilder = ctx.db.query("files");

    // Conditionally apply the filter only if `teamId` is provided
    const result = args.teamId
      ? queryBuilder.filter((q) => q.eq(q.field("teamId"), args.teamId))
      : queryBuilder;

    const files = await result.order("desc").collect();
    return files;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { document: args.document });
    return result;
  },
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.whiteboard === undefined) {
      // Handle the case where whiteboard is not provided
      return;
    }
    const result = await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
    });
    return result;
  },
});
export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});
