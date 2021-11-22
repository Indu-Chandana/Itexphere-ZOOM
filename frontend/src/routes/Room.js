import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import CallPageFooter from "../components/CallPageFooter/CallPageFooter";
import CallPageHeader from "../components/CallPageHeader/CallPageHeader";
import Messenger from "../components/Messenger/Messenger";
import MessageListReducer from '../reducers/MessageListReducer';
import { RoomContext } from "../components/RoomContext";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
// let peer = null;
const Container = styled.div`
    height: 100vh;
    width: 100%;
    object-fit: cover;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    background: black;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const initialState = [];

const Room = (props) => {
    const { peers, setPeers } = useContext(RoomContext);
    const { setSocketName, setTwoSocketName } = useContext(RoomContext);
    const user = useSelector(selectUser);
    const history = useHistory();
    let alertTimeout = null;

    // const [messageList, messageListReducer] = useReducer(
    //     MessageListReducer,
    //     initialState
    // );

    // const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const [streamObj, setStreamObj] = useState();
    const [screenCastStream, setScreenCastStream] = useState();
    const [isPresenting, setIsPresenting] = useState(false);
    const [isAudio, setIsAudio] = useState(true);
    const [isVideo, setIsVideo] = useState(true);
    const roomID = props.match.params.roomID;
    const [me, setMe] = useState();
    const [isMessenger, setIsMessenger] = useState(false);
    // const [messageAlert, setMessageAlert] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [name, setName] = useState(user.name);
    // const [socketName, setSocketName] = useState([]);
    // const [twoSocketName, setTwoSocketName] = useState([]);

    // let myVideoStream;
    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            setStreamObj(stream)
            // myVideoStream = stream;
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                setTwoSocketName(oldTwo=> [...oldTwo, payload.name])
                const peer = addPeer(payload.signal, payload.callerID, stream, payload.name);
                
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                setSocketName(old=> [...old, payload.name])
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("message", (message) => {
                receiveMessage(message);
            });
            // socketRef.current.on("data", (data) => {
            //     clearTimeout(alertTimeout);
            //     messageListReducer({
            //       type: "addMessage",
            //       payload: {
            //         user: "other",
            //         msg: data.toString(),
            //         time: Date.now(),
            //       },
            //     });
            // });
        })
    }, []);


    function receiveMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
    }

    function handleChange (e) {
        setMessage(e.target.value);
    }

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal, name })
        })

        setMe(peer);
        return peer;
    }


    function addPeer(incomingSignal, callerID, stream, name) {
        
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID, name })
        })

        peer.signal(incomingSignal);

        setMe(peer);
        return peer;
    }

    const toggleAudio = (value) => {
        streamObj.getAudioTracks()[0].enabled = value;
        setIsAudio(value);
    }

    const toggleVideo = (value) => {
        streamObj.getVideoTracks()[0].enabled = value;
        setIsVideo(value);
    }

    const screenShare = () => {
        navigator.mediaDevices
          .getDisplayMedia({ cursor: true })
          .then((screenStream) => {
            me.replaceTrack(
              streamObj.getVideoTracks()[0],
              screenStream.getVideoTracks()[0],
              streamObj
            );
            setScreenCastStream(screenStream);
            screenStream.getTracks()[0].onended = () => {
                me.replaceTrack(
                screenStream.getVideoTracks()[0],
                streamObj.getVideoTracks()[0],
                streamObj
              );
            };
            setIsPresenting(true);
          });
      };
    
      const stopScreenShare = () => {
        screenCastStream.getVideoTracks().forEach(function (track) {
          track.stop();
        });
        me.replaceTrack(
          screenCastStream.getVideoTracks()[0],
          streamObj.getVideoTracks()[0],
          streamObj
        );
        setIsPresenting(false);
      };

    const disconnectCall = () => {
        // me.destroy();
        history.push("/");
        window.location.reload();
    }

    // const sendMsg = (msg) => {
    //     me.send(msg);
    //     messageListReducer({
    //         type: "addMessage",
    //         payload: {
    //             user: "you",
    //             msg: msg,
    //             time: Date.now(),

    //         }
    //     })
    // }

    console.log(me);
    console.log(peers);
    console.log(name)
    // console.log('socketName', socketName);
    // console.log('twoSocketName', twoSocketName);
    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {/* <div onClick={() => toggleAudio(!isAudio)}>
                <button>Microphone</button>
            </div>
            <div onClick={() => toggleVideo(!isVideo)}>
                <button>Video</button>
            </div> */}
            
            {/* <button onClick={playStop}> CLICK </button> */}
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}

            <CallPageHeader
            isMessenger={isMessenger}
            setIsMessenger={setIsMessenger}
            // messageAlert={messageAlert}
            // setMessageAlert={setMessageAlert}
            />
            <CallPageFooter 
            isAudio={isAudio}
            toggleAudio={toggleAudio}
            isVideo={isVideo}
            toggleVideo={toggleVideo}
            isPresenting={isPresenting}
            stopScreenShare={stopScreenShare}
            screenShare={screenShare}
            disconnectCall={disconnectCall}
            />
            {isMessenger ? (
                <Messenger
                setIsMessenger={setIsMessenger}
                message={message}
                messages={messages}
                handleChange={handleChange}
                sendMessage={sendMessage}
                peers={peers}
                // socketName={socketName}
                // twoSocketName={twoSocketName}
                // sendMsg={sendMsg}
                // messageList={messageList}
                />
            ): null}
        </Container>
    );
};

export default Room;
