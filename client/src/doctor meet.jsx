import { useState } from 'react';
import io from 'socket.io-client';  
const socket=io("http://localhost:6001")
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