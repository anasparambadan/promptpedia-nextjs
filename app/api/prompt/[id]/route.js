//GET

import { connectToDB } from "@utils/database"
import promptModel from "@models/prompt"
import { json } from "express"

export const GET = async (req,{params})=>{
    try {
        connectToDB()
        const prompt = await promptModel.findById(params.id).populate('creator')
        if(!prompt) {return new Response("Prompts not found",{status:404})}
        return new Response(JSON.stringify(prompt),{status:200})

    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch prompts",{status:500})
        
        
    }
}

export const PATCH = async(req,{params})=>{
    const {prompt,tag} = await req.json()
    try {
        await connectToDB()
        const existingPrompt = await promptModel.findById(params.id);
        if(!existingPrompt) return new Response("prompt not found",{status:404})
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to update",{status:500})
    }
}

export const DELETE  = async (req,{params})=>{
    try {
         
        await connectToDB()
        await promptModel.findByIdAndRemove(params.id)
        return new Response("Prompt deleted succesfully",{statu:200})
    } catch (error) {
        return new Response("Failed to delete prompts",{status:500})
        
    }
}