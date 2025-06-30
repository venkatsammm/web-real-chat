// const express =require('express')
// const http = require("http")
// const cors= require("cors") 
// const Websocket=require("ws")
// const { json } = require('stream/consumers')
// const app = express() 
// app.use(cors())
// app.use(express.json())
// const server = http.createServer(app)
// const wss = new Websocket.Server({server}) 

// wss.on("connection",(ws)=>{
//     console.log("Client connected")
//     ws.on("message",(message)=>{
//         console.log("Received message from client",message.toString())
//         wss.clients.forEach((client)=>{
//             if (client.readyState === Websocket.OPEN){
//                 client.send(JSON.stringify({message:message.toString()}))

//             }

//         })

//     })
//     ws.on("close",()=>{
//         console.log("disconnected")
//     })

// }) 
// server.listen(3000,()=>{
//     console.log("server is running on port 3000")
// })

const express= require('express')
const http = require("http") 
const Websocket = require("ws")
const cors =require("cors")
const app =express()
app.use(cors()) 
app.use(express.json())
const server =http.createServer(app)
const wss =new Websocket.Server({server}) 

wss.on("connection" , (ws)=>{
    console.log("Client connected")
    ws.on("message",(message)=>{
        console.log("message recived",message.toString())
         wss.clients.forEach((client)=>{
            if (client.readyState===Websocket.OPEN){
                client.send(JSON.stringify({message:message.toString()}))
            }

    })
    })
       
    ws.on("close",()=>{
        console.log("disconnected")

    })

})
server.listen(3000,()=>{
    console.log("server is running on port 3000")
})