import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from '../axios';
import { GoogleLogout } from 'react-google-login'
import { useGoogleLogout } from 'react-google-login'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import './CreateRoom.css';
import { FaCaretDown } from "react-icons/fa";
import Modal from "../components/Modal";
import AddIcon from '@mui/icons-material/Add';
import FreeBreakfastTwoToneIcon from '@mui/icons-material/FreeBreakfastTwoTone';
import GamesOutlinedIcon from '@mui/icons-material/GamesOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CameraIcon from '@mui/icons-material/Camera';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { RoomContext } from "../components/RoomContext";
const CreateRoom = (props) => {
    const { peers} = useContext(RoomContext);
    const user = useSelector(selectUser);
    const [roomnames, setRoomnames] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const history = useHistory();

    // const { signOut, loaded } = useGoogleLogout({})

    useEffect(() => {
        axios.get('/get')
            .then(response => {
                setRoomnames(response.data)
            })
    }, [roomnames])


    // const sendName = async (e) => {
    //     e.preventDefault();

    //     await axios.post('/newroom', {
    //         "name": input
    //     });

    //     setInput('');
    // }

    function create(_id) {
        props.history.push(`/room/${_id}`);
    }

    const logout = () => {
        window.location.reload();
    }

    // console.log("Hello",peers)

    return (
        // <button onClick={create}>Create room</button>
        <div className="full">


            <div className="create-room-main">

                <div className="top">

                    {/* <GoogleLogout
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                >
                </GoogleLogout> */}

                    <div className="top-left-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_W9vt7UNUkNjcTDHLJToF7pH71bZzLDkj5__5IAUt_qLL8yCyleU5ACamuJ-XWMs3XE0&usqp=CAU" alt="" />
                    </div>
                    <div className="lssa">
                        <div className="top-right" onClick={() => setDropDown((prevState) => !prevState)} >
                            <div className="top-right-img">
                                <img src={user.image} alt="" />
                            </div>

                            <span>{user.name}</span>
                            <FaCaretDown className="icon" />
                        </div>

                        {dropDown &&
                            <div className="top-right-menu">
                                <div className="top-right-menu-top">
                                    <div className="top-right-menu-top-img">
                                        <img src={user.image} alt="" />
                                    </div>
                                    <h3>{user.name}</h3>
                                    <span>{user.email}</span>
                                </div>

                                <div className="top-right-menu-below">
                                    <div className="top-right-menu-below-one" onClick={() => history.push("/profile")}><PersonOutlineOutlinedIcon className="menu-icon" /> <p>Your Profile</p></div>
                                    <div className="top-right-menu-below-one"><LogoutOutlinedIcon className="menu-icon" />
                                        <GoogleLogout
                                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <p onClick={renderProps.onClick} disabled={renderProps.disabled}>LogOut</p>
                                            )}
                                            buttonText="Login"
                                            onLogoutSuccess={logout}
                                        />
                                        {/* <p>LogOut</p> */}
                                    </div>
                                </div>
                            </div>
                        }

                    </div>

                </div>

                <div className="header-title">
                    <p> Language Practice Community </p>
                </div>

                <div className="header-top">
                    <div onClick={() => setIsOpen(true)} className="popup-button">
                        <AddIcon className="addIcon" />
                        <button > Create New Room </button>
                    </div>
                    <Modal open={isOpen} onclose={() => setIsOpen(false)} />

                    <div className="buy-me-coffee">
                        <FreeBreakfastTwoToneIcon className="breakIcon" />
                        <button> buy me a coffe </button>
                    </div>
                    <div className="herder-top-button">
                        <GamesOutlinedIcon className="herder-top-icon" />
                        <button> Free4Talk App </button>
                    </div>
                    <div className="herder-top-button">
                        <VerifiedUserOutlinedIcon className="herder-top-icon" />
                        <button> Privacy Policy </button>
                    </div>
                    <div className="herder-top-button">
                        <FacebookIcon className="herder-top-icon" />
                        <button> Facebook group </button>
                    </div>
                </div>

                <div className="header-mid">

                </div>

                {/* <form >
                    <input value={input} onChange={e => setInput(e.target.value)}
                        placeholder="Type a Room Name" type="text" className=" border border-gray-800" />
                    <button onClick={sendName} type="submit" className="hidden" >Click</button>
                </form> */}

                <div className="names">
                    {roomnames.map((roomname, i) => (
                        <div className="form" key={i}>
                            <div className="form__top">
                                <CameraIcon className="form__top-icon" />
                                <p>{roomname.name}</p>
                                <SettingsOutlinedIcon className="form__top-icon" />
                            </div>
                            <div className="form__middle">
                                <img src={user.image} alt="" />
                            </div>
                            <div className="form__end">
                                <div className="form__end-border">
                                    <CallOutlinedIcon className="form__end-icon"/>
                                    <button
                                        onClick={() => {
                                            create(roomname._id)
                                        }}
                                    >Join and talk now!</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
