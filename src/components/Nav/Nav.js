import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';
import style from "./Nav.module.css"

export default function Nav() {
    const navigate = useNavigate();

    const handleSignout = () => {
        const confirm = window.confirm("Are you trying to sign out?");
        if (confirm) {
            signOut(auth);
            navigate("/login");
        }
    }
    const bgColor = "text-zinc-300";
    return (
        <div className={`flex justify-end ${style.navContainer}`}>
            <div className={`text-right mt-2`}>
                <Link to={"/home"} className={` py-1 px-4 rounded-xl  w-[fit]  ${bgColor} `}>Home</Link>
            </div>
            <div className={`text-right mt-2`}>
                <Link to={"/manage"} className={` py-1 px-4 rounded-xl  w-[fit] ${bgColor} `}>Manage</Link>
            </div>
            <div onClick={() => handleSignout()} className={`text-right mt-2`}>
                <span className={` py-1 px-4 rounded-xl  w-[fit] ${bgColor} `}>Signout</span>
            </div>
        </div>
    )
}
