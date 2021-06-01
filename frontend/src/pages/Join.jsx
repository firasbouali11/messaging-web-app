import React, { useState } from 'react'
import {Link} from "react-router-dom"
function Join() {
    const [name,setName] = useState("")
    const [room,setRoom] = useState("")
    return (
        <div>
            <h1 className="text-center mt-5 text-light">Chat Room Login</h1>
            <div className="container box d-flex justify-content-center align-items-center flex-column mt-5 ">
                <div>
                    <input type="text" placeholder="Enter your Name" style={{ width: 500, height: 60 }} value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <br />
                <div>
                    <input type="text" placeholder="Enter the room name" style={{ width: 500, height: 60 }} value={room} onChange={e=>setRoom(e.target.value)}/>
                </div>
                <br />
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="btn btn-warning btn-lg">Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
