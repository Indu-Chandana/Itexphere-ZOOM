import React, { useState } from 'react'
import './Messenger.scss'
import { FaCommentAlt, FaPaperPlane, FaTimes, FaUserFriends } from "react-icons/fa";
import PresentName from './PresentName';
// import { formatDate } from '../utils/helpers';
function Messenger({ setIsMessenger, sendMsg, messageList, messages, message, handleChange, sendMessage, peers }) {
    const [presentName, setPresentName] = useState(false);
    // console.log('socketName', socketName);
    return (
        <div className="messenger-container">
            
            <div className="messenger-header">
                <h3>Meeting Details</h3>
                {/* {socketName.map((item) => (

                    <p>{item}</p>
                ))}
                {twoSocketName.map((two) => (
                    <p>{two}</p>
                ))} */}
                <FaTimes className="icon" onClick={() => {
                    setIsMessenger(false);
                }} />
            </div>
            <div className="messenger-header-tabs">
                <div className={`tab ${presentName && "active"} `}  onClick={() => {
                setPresentName(true);
            }}>
                    <FaUserFriends />
                    <p>People {peers.length + 1}</p>
                </div>
                <div className={`tab ${!presentName && "active"} `} onClick={() => {
                setPresentName(false);
            }}>
                    <FaCommentAlt className="icon" />
                    <p>Chat</p>
                </div>
            </div>

            <div className="chat-section">
                {presentName ? (
                    <PresentName
                    // socketName={socketName}
                    />
                ): (
                    <div>
                        {messages.map((message) => {
                        return(
                            <div className="chat-block">
                            <div className="sender">
                                you <small> 10 PM </small>
                            </div>
                            <p className="msg">{message.body}</p>
                        </div>
                        )
                        
                    })}
                    </div>
                    
                )}
            
                
                

            </div>

            <div className="send-msg-section">
                <input
                    placeholder="Send a message to everyone"
                    value={message}
                    onChange={handleChange}
                />
                <FaPaperPlane className="icon" onClick={sendMessage}/>
            </div>
        </div>
    )
}

export default Messenger
