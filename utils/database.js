import mongoose from "mongoose";

let isConnected = false;


export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("Database is already connected")
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"promptpedia",
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected = true;
        console.log("Data base connected")
    } catch (error) {
        
        console.log(error)
    }
}