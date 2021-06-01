import React, { useState, useEffect } from 'react'
import queryString from "query-string"
import io from "socket.io-client"


let socket

function Chat() {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const endpoint = "localhost:5050"

    const location = window.location.search
    useEffect(() => {
        const { name, room } = queryString.parse(location)
        console.log(name, room)
        socket = io(endpoint)
        setName(name)
        setRoom(room)

        socket.emit("join", { name, room }, (error) => {
            if(error != null) alert(error)
        })
        return () => {
            socket.emit("disconnect")
            socket.off()
        }

    }, [location, endpoint])

    useEffect(() => {
        socket.on("message", (msg) => {
            setMessages([...messages, msg])
        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }

    return (
        <div>
            <h1 className="display-2 text-center text-light">User: {name}</h1>
        <div className="chat">
            <div className="bg-primary d-flex align-items-center pl-2" style={{ position: "absolute", top: 0, left: 0, height: 60, width: "100%"}}>
                <h4>{room}</h4>
            </div>
            <div style={{paddingTop:90}}>
                {messages.map((message)=>(
                    <p><strong>{message.user}: </strong>{message.text}</p>
                ))}
            </div>
            <div style={{ height: 50, position: "absolute", bottom: 0, width: "100%" }}>
                <input
                    type="text" style={{ height: "100%", width: "80%" }}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => e.key === "Enter" ? sendMessage(e) : null}
                />
                <button className="btn btn-primary" style={{ height: "100%", width: "20%" }} onClick={e=>sendMessage(e)} >Send</button>
            </div>
        </div>
        </div>
    )
}

export default Chat
