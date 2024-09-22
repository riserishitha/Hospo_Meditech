const express = require("express");
const app = express();
const htp=require("http").createServer(app)
const socket=require("socket.io")
const io=socket(htp,{cors:"*"})
const cors=require("cors")

app.use(cors())
app.get("/", (req, res) => {
    res.send("Welcome to Hospo!");
});
let rooms=[]
io.on("connection",(socket)=>{
    socket.on("join",(id)=>{
        if(!rooms.includes(id)){
            rooms.push(id)
        }
        socket.join(id)
    })
    socket.on("check",(id)=>{
        if(rooms.includes(id)){
            socket.to(id).emit("conform","yes")
        }
    })
    socket.on('updateLocation', (data) => {
        console.log('Location update received:', data);
        
        io.emit('deliveryLocationUpdate', data);
    });


})

htp.listen(3000,()=>{
    console.log("hg8")
})