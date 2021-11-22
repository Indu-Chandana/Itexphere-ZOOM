import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import './Login.css';
import Button from '@mui/material/Button';

function Login() {
    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        console.log(response.profileObj);
        dispatch(
            login({
                name: response.profileObj.name,
                image: response.profileObj.imageUrl,
                email: response.profileObj.email,
            })
        )
    }

    // console.log({name})
    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://www.seekpng.com/png/full/87-873512_phone-call-logo-png-mobile-calling-logo-png.png"
                    alt=""
                />
                <div className="login__text">
                    <h1>Sign in to Free4talk</h1>
                </div>
                <GoogleLogin
                    clientId="988836340451-pqpi4evnl7qut2h2b647p5rttkjrqbg0.apps.googleusercontent.com"
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign In With Google</Button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    isSignedIn={true}
                />
            </div>
            {/* <h1>Hello...</h1>

            <GoogleLogin
              clientId="988836340451-pqpi4evnl7qut2h2b647p5rttkjrqbg0.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              isSignedIn={true}
            /> */}
        </div>
    )
}

export default Login
