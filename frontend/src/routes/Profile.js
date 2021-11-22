import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { GoogleLogout } from 'react-google-login';
import './Profile.css';
import { useHistory } from 'react-router';


function Profile() {
    const user = useSelector(selectUser)
    const history = useHistory();

    const logout = () => {
        history.push("/")
        window.location.reload();
    }

    return (
        <div className="profileScreen">
            <div className="profileScreen__body">
                <h1>My Profile</h1>
                <div className="profileScreen__info">
                    <img src={user.image} alt="" />
                    <div className="profileScreen__details">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <GoogleLogout
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="profileScreen__signOut">Sign Out</button>
                            )}
                            buttonText="Login"
                            onLogoutSuccess={logout}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
