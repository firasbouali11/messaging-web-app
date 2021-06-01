const express = require("express")
const http = require("http")
const socket = require("socket.io")
const router = require("./router")
const {users,getUser,getUsersInRoom,removeUser,addUser}  = require("./users")

const port = 5050

const app = express()
const server = http.createServer(app)
const io = socket(server)

io.on("connect",(socket)=>{
    console.log("user has connected !")

    socket.on("join",({name,room},callback)=>{
        const {error,user} = addUser({id:socket.id,name,room})

        if(error) return callback(error)

        socket.emit("message",{user:'admin',text:`${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name} has joined`})
        socket.join(user.room)

        io.to(user.room).emit("roomData",{room:user.room,users:getUsersInRoom(user.room)})

        callback()
    })

    socket.on("sendMessage",(message,callback)=>{
        let user = getUser(socket.id)
        io.to(user.room).emit("message",{user:user.name,text:message})
        console.log(users)
        callback()
    })

    socket.on("disconnect",()=>{
        console.log("user had left !")
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit("message",{user:"admin",text:`${user.name} has left the room`})
            io.to(user.room).emit("roomData",{room:user.room,users:getUsersInRoom(user.room)})

        }
    })
    
})

app.use(router)


server.listen(port,()=>{
    console.log("server running on port ",port)
})