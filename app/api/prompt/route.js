import { connectToDB } from "@utils/database"
import promptModel from "@models/prompt"

export const GET = async (req,res)=>{
    try {
        connectToDB()
        const prompts = await promptModel.find().populate('creator')
        return new Response(JSON.stringify(prompts),{status:200})

    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch prompts",{status:500})
        
        
    }
}