import React from 'react'
import './CallPageFooter.scss';
import { FaAngleUp, FaClosedCaptioning, FaDesktop, FaMicrophone, FaMicrophoneSlash, FaPhone, FaVideo, FaVideoSlash } from "react-icons/fa";
function CallPageFooter({
    isAudio,
    toggleAudio,
    isVideo,
    toggleVideo,
    isPresenting,
    stopScreenShare,
    screenShare,
    disconnectCall,
}) {
    return (
        <div className="footer-items">
            <div className="left-item">
                <div className="icon-block">
                    Meeting details
                    <FaAngleUp className="icon" />
                </div>
            </div>
            <div className="center-item">
                <div className={`icon-block ${!isAudio ? "red-bg" : null}`} onClick={() => toggleAudio(!isAudio)}>
                    {isAudio ? <FaMicrophone className="icon"/> : <FaMicrophoneSlash className="icon"/>}
                    
                </div>
                <div className="icon-block" onClick={disconnectCall}>
                    <FaPhone className="icon red"/>
                </div>
                <div className={`icon-block ${!isVideo ? "red-bg" : null}`} onClick={() => toggleVideo(!isVideo)}>
                    {isVideo ? <FaVideo className="icon"/> : <FaVideoSlash className="icon"/>}
                    
                </div>
            </div>

            <div className="right-item">
                <div className="icon-block">
                    <FaClosedCaptioning className="icon red"/>
                    <p className="title"> Turn on caption </p>
                </div>
                {isPresenting ? (
                    <div className="icon-block" onClick={stopScreenShare}>
                        <FaDesktop className="icon red"/>
                        <p className="title"> Stop Present </p>
                    </div>
                ) : (
                    <div className="icon-block" onClick={screenShare}>
                        <FaDesktop className="icon red"/>
                        <p className="title"> Present now </p>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default CallPageFooter
