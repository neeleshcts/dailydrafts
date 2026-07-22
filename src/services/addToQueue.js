import { redis } from "../../api/upstash/redis";

export const addToQueue = async (textInput)=>{

    try {
        console.log(textInput);
        const response  = await redis.json.arrappend(`${import.meta.env.UNIQUE_ID}`, "$.inputs", JSON.stringify(textInput));
        return response;
        
    } catch (error) {
        console.log(error.message)
    }
}