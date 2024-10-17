import { useState } from 'react';
import io from 'socket.io-client';  
const socket=io("https://hospo.onrender.com")
function Docmet(){
    const [value,setvalue]=useState("")
    function check(){
        socket.emit("check",value)
        socket.on("conform",(val)=>{
            if (val){
                alert("yes")
            }
        })

    }
    return(
        <>
        <input onChange={(e)=>{setvalue(e.target.value)}}/>
        <button onClick={check}>Check</button>
        </>
    )
}
export default Docmet