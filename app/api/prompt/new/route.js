import { connectToDB } from "@utils/database"
import promptModel from "@models/prompt"

export const POST = async (req,res)=>{


    const {userId,tag,prompt}  = await req.json()
    try {
        await connectToDB()
        const newPrompt = new promptModel({
            creator:userId,
            tag,
            prompt
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt,{status:201}))
    } catch (error) {
        console.log(error)
        return new Response("Failed to create new prompts",{status:500})
        
    }

}