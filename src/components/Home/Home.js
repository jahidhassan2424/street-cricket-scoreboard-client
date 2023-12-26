import React from 'react'
import style from "./Home.module.css"
import Score from './Score/Score'
import Controller from './Controller/Controller'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import { useNavigate } from 'react-router'

export default function Home() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    if (!user) {
        localStorage.removeItem("userEmail");
        navigate("/login");
    } else {
        localStorage.setItem("userEmail", user?.email);
    }
    return (
        <div>
            {/* <Controller /> */}
            <Score />
        </div>
    )
}


