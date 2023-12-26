import React from 'react'
import style from "./Home.module.css"
import Score from './Score/Score'
import Controller from './Controller/Manage'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import { useNavigate } from 'react-router'
import { signOut } from 'firebase/auth'

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
        <div className={`bg-[#DDDDDD] pb-10 h-[100vh]`}>
            {/* <Controller /> */}

            <Score />
        </div>
    )
}


