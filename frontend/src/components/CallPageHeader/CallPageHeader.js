import React, { useContext, useEffect, useState } from 'react'
import './CallPageHeader.scss';
import { FaUserFriends, FaCommentAlt, FaUserCircle } from "react-icons/fa";
import { formatDate } from '../utils/helpers';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { RoomContext } from '../RoomContext';
function CallPageHeader({
    isMessenger,
    setIsMessenger,
    messageAlert,
    setMessageAlert,
}) {
    const user = useSelector(selectUser);
    const { peers } = useContext(RoomContext);

    let interval = null;
    const [currentTime, setCurrentTime] = useState(() => {
        return formatDate();
    });

    useEffect(() => {
        interval = setInterval(() => setCurrentTime(formatDate()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="frame-header">
            <div className="header-items icon-block">
                <FaUserFriends className="icon"/>
                <span className="alert-circle-icon">{peers.length + 1}</span>
            </div>
            <div className="header-items icon-block" onClick={() => {
                setIsMessenger(true);
                // setMessageAlert({});
            }}>
                <FaCommentAlt className="icon"/>
                {/* {!isMessenger && messageAlert.alert && (
                    <span className="alert-circle-icon"></span>
                )} */}
                
            </div>
            <div className="header-items date-block">{currentTime}</div>
            <div className="header-items icon-block">
                <FaUserCircle src={user.image} className="icon profile"/>
            </div>
        </div>
    )
}

export default CallPageHeader
