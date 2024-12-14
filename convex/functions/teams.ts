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




export const joinTeam = mutation({
    args: {
        teamId: v.id('teams'),
        email: v.string()
    },
    handler: async (ctx, args) => {
        const { teamId, email } = args;
        console.log('mail id',args.email," ",args.teamId)
        console.log('Context:', ctx); // Debugging context
        console.log('Arguments:', args); // Debugging arguments
        try{
        const team = await ctx.db.query("teams")
        .filter(q=>q.eq(q.field('_id'),args.teamId))
        .first();

        if(!team){
            console.log('error in finding team')
            return
        }
    


        const updatedMembers = [...team.members, email];


        await ctx.db.replace(team._id,{ ...team, members: updatedMembers })
        console.log(`Successfully added ${email} to team ${teamId}`);
        // if (!team) {
        //     throw new Error('Team not found');
        // }
    
        // if (team.members && team.members.includes(args.email)) {
        //     throw new Error('User is already a member of the team');
        // }
    
        // const updatedTeam = await ctx.db.patch(args.teamId, {
        //     members: [...(team.members || []), args.email],
        // });
    
        // return updatedTeam;
        } catch(e){
            console.log('error joining team',e)
        }
    }
    
});