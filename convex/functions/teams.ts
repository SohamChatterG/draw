import {v} from 'convex/values'
import { mutation, query } from '../_generated/server'
export const getTeam = query({
    args : {
        email :  v.string()
    },
    handler: async (ctx,args) => {
        const result = await ctx.db.query("teams")
        .filter(q=>q.eq(q.field('createdBy'),args.email))
        .collect()

        return result;
    }
})

export const createTeam = mutation({
    args : {
        teamName : v.string(),
        createdBy : v.string(),
    },
    handler: async (ctx,args) => {
        // Initialize the members array with the creator
        const teamData = {
            teamName: args.teamName,
            createdBy: args.createdBy,
            // members: [args.createdBy] // Add the creator to the members list
        };


        const team = await ctx.db.insert('teams',teamData)
        console.log('team from convex',team)
        return team;
    }
})


