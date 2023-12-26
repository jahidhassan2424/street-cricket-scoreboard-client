// Login.js

import React, { useEffect, useState } from 'react';
import './Login.css';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';


const Login = ({ from }) => {
    const [user] = useAuthState(auth);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            navigate("/home");
            localStorage.setItem('userEmail', user?.email);
        } else {
            signOut(auth);
            localStorage.removeItem('userEmail');
        }
    }, [user]);

    const handleLogin = () => {
        // Add your login logic here
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                // DO NOT ADD navigate("/home") here or else it will redirect to home page without creating userInfo ini dataBase

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    };



    return (
        <div className={`h-[100vh] flex justify-center items-center mt-5 md:px-10 shadow-lg `}>
            <div className="register-container h-[fit] shadow-xl p-10 rounded-lg">
                <h2 className={`text-3xl mb-10 uppercase font-bold`}>Login</h2>
                <button onClick={() => handleLogin()} className=" google-signin-btn font-bold">Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;