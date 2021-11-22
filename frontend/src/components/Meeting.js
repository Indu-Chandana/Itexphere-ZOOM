import React, { useEffect } from 'react';
import Peer from 'peerjs';
import { io } from 'socket.io-client';
import { useRef } from 'react';

const socket = io('http://localhost:3030/');
function Meeting() {
    const roomId = 12345

    console.log(roomId)

    const myVideo = useRef();
    const userVideo = useRef();

    const myPeer = new Peer(undefined, {
        path: '/peerjs',
        host: '/',
        port: '3030'
    }); 

    const peers = {}

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            // addVideoStream(myVideo, stream)
            myVideo.current.srcObject = stream
    
            myPeer.on('call', call => {
                call.answer(stream)
    
                call.on('stream', userVideoStream => {
                    userVideo.current.srcObject = userVideoStream
                })
            })
    
            socket.on('user-connected', userId => {
                setTimeout(() => {
                    connectToNewUser(userId, stream)
                }, 1000)
            })
        })
    
        socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
        })
    
        myPeer.on('open', id => {
            socket.emit('join-room', roomId, id)
        })
    
        socket.on('user-connected', userId => {
            console.log('User connected: ' + userId)
        })
    
    }, [])
    
    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        call.on('stream', userVideoStream => {
            userVideo.current.srcObject = userVideoStream
        })

        peers[userId] = call
        
    }

    return (
        <div>
            <div>
                <video playsInline muted ref={myVideo} autoPlay/>
            </div>

            <div>
                <video playsInline ref={userVideo} autoPlay />
            </div>
            
        </div>
    )
}

export default Meeting
