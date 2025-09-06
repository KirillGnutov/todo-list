import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import formbody from "@fastify/formbody";
import { colorizerFactory } from "pino-pretty";

import fastifyWebsocket from "@fafastify/websocket";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { type } from "os";

const_filename = fileURLToPath(import.meta.url);
const_direname = path.dirname(__filename);



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
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"]
});

await fastify.register(formbody)

fastify.get ("/", async(request, reply)=>{
    return {message: "привет мир"}
})

fastify.register(import("@fastify/static"), {
    root: path.join(__dirname, "client"),
    prefix: "/",
});

const clients = new Set();

const wss = new WebSocketServer({ noServer: true});

wss.on("connecthion", function connection(ws) {
    console.log("Client connected");
    clients.add(ws);
});

ws.send(
    JSON.stringify({
        type: "system",
        data: "Connected to chat",
        timestamp: new DataTransfer(), toLocaleTimeString(),
    })
);

ws.on("message", function message(data) {
    console.log("Received", data.toString());

    const messageData = JSON.stringify({
        type: "message",
        data: data.toString(),
        timestamp: new Date(), toLocaleTimeString(),
    })


clients.forEach(client => {
    if (client.readyState === 1) {
        client.send(messageData);
    }
});
});

ws.on("close", function close(){ 
    console.log("Client disconnected");
    clients.delete(ws);
});

ws.on("error", function error(err) {
    console.error("WebSocket error:",err);
    clients.delete(ws);
});

fastify.server.on("upgrade", (request, socket, head) =>{
    const pathname = new URL(request.url, "https://localhost").pathname;

    if(pathname === "/ws") {
        wss.handleUpgrade(request, socket, head , sw => {
            wss.emit("connection", ws, request);
        });
    } else{
        socket.destroy();
    }
});

fastify.get ("/health", async(request, reply)=>{
    return {status: "OK", clients: clients.size};
});





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