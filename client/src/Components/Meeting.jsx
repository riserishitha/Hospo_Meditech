import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { useParams, useNavigate } from 'react-router';
import io from 'socket.io-client';  // Import Socket.IO

const socket = io("http://localhost:3000");  // Connect to Socket.IO backend

function Meeting() {
    const [stream, setStream] = useState();
    const [peerId, setPeerId] = useState('');
    const { userid } = useParams();
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const peerInstance = useRef(null);
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(true);
    const nav = useNavigate();
    const name = userid;

    useEffect(() => {
        // Socket.IO: Join the room when component mounts
        socket.emit("join", name);

        navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;
                localVideoRef.current.muted = true;
                setStream(stream);

                const peer = new Peer(name);
                peer.on('open', (id) => {
                    console.log(id);
                    setPeerId(id);
                });
                peer.on('call', (call) => {
                    call.answer(stream);
                    call.on('stream', (remote) => {
                        remoteVideoRef.current.srcObject = remote;
                    });
                });
                peerInstance.current = peer;
            })
            .catch((error) => {
                console.error('Failed to get local stream', error);
            });
    }, [audio, video]);

    function call(remotePeerId) {
        const call = peerInstance.current.call(remotePeerId, stream);
        call.on("stream", (remote) => {
            remoteVideoRef.current.srcObject = remote;
        });
    }

    // New: Check if the room has other users using Socket.IO
    function checkRoom() {
        socket.emit("check", name);
        socket.on("confirm", (response) => {
            if (response === "yes") {
                console.log("Another user is in the room");
                // You can initiate the call here if you want
            } else {
                console.log("No other users in the room");
            }
        });
    }

    function toggleAudio() {
        setAudio(!audio);
        if (stream) {
            stream.getAudioTracks()[0].enabled = !audio;
        }
    }

    function toggleVideo() {
        setVideo(!video);
        if (stream) {
            stream.getVideoTracks()[0].enabled = !video;
        }
    }

    function endCall() {
        if (peerInstance.current) {
            peerInstance.current.destroy();
        }
        nav('/');
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch((error) => {
                console.error('Unable to copy text: ', error);
            });
    }

    return (
        <div className="h-screen bg-DEFFDA p-2 flex flex-col justify-center items-center">
            <div className="flex flex-wrap w-full justify-center">
                <div className="w-96 relative">
                    <video playsInline autoPlay ref={localVideoRef} className="rounded-lg w-full" />
                </div>
                <div className="w-96 m-3 relative">
                    <video playsInline autoPlay ref={remoteVideoRef} className="rounded-lg w-full" />
                    <h1 className="text-white absolute bottom-1 left-2 font-semibold">{remotePeerIdValue}</h1>
                </div>
            </div>
            <div className="flex mt-4">
                <button className={`text-white mr-2 px-4 py-2 rounded ${audio ? 'bg-gray-500' : 'bg-red-400'} `} onClick={toggleAudio}>
                    {audio ? "Mute" : "Unmute"}
                </button>
                <button className={`text-white mr-2 px-4 py-2 rounded ${video ? 'bg-gray-500' : 'bg-red-400'} `} onClick={toggleVideo}>
                    {video ? "Stop Video" : "Start Video"}
                </button>
                <button className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600" onClick={endCall}>
                    End Call
                </button>
            </div>

            <button className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600" onClick={checkRoom}>
                Check Room
            </button>
        </div>
    );
}

export default Meeting;
