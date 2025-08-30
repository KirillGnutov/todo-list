import Fastify from "fastify"
import cors from "@fastify/cors"
import helmet from "@fastify/helmet"
import formbody from "@fastify/formbody"
import { colorizerFactory } from "pino-pretty"

const fastify = Fastify({
    logger:{
        level:"info", 
        transport:{
            target:"pino-pretty", 
            options:{
                colorize: true
            }
        }      
    }
})


await fastify.register(cors,{
    origin:"*"
})

await fastify.register(formbody)

fastify.get ("/", async(request, repli)=>{
    return {message: "привет мир"}
})

const start = async ()=>{
    try{
        await fastify.listen({port:3000})
        console.log("сервер запущен")
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}

start()