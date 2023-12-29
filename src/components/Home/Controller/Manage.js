import React, { useEffect, useState } from 'react'
import style from "./Manage.module.css"
import { SERVER_URL, refetch } from '../../../variable'
import axios from 'axios'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init'
import { useData } from '../../Context/DataProvider'

export default function Manage() {
    const [user] = useAuthState(auth);
    const [currentStatus, setCurrentStatus] = useState({})
    const { refetch, setRefetch, fetchData } = useData();
    const [disableBtn, setDisableBtn] = useState(false);
    useEffect(() => {
        if (refetch) {
            fetchData();
            setRefetch(false);
        }
    }, [refetch, setRefetch, fetchData]);

    const runs = [
        {
            label: "0",
            value: 0,
        },
        {
            label: "1",
            value: 1,
        },
        {
            label: "2",
            value: 2,
        },
        {
            label: "3",
            value: 3,
        },
        {
            label: "4",
            value: 4,
        },
        {
            label: "5",
            value: 5,
        },
        {
            label: "6",
            value: 6,
        },
        {
            label: "7",
            value: 7,
        },
        {
            label: "8",
            value: 8,
        }

    ]

    const exception =
        [
            {
                label: "NB",
                value: 0,
            },
            {
                label: "WB",
                value: 1,
            },
            {
                label: "W",
                value: 0,
            }
        ]

    const reEnableButton = () => {
        setTimeout(() => {
            setDisableBtn(false);
        }, 1000);
    }
    const addRun = (value) => {
        setDisableBtn(true);
        axios.post(`${SERVER_URL}/increaseRun/${value}`, {}, {
            headers: {
                authorization: user?.email || "none"
            }
        })
            .then(res => {
                reEnableButton();
                console.log("Response: ", res);
                setRefetch(!refetch);
            })
            .catch(function (e) {
                reEnableButton();
                console.log(e)
            })
    }
    const addException = (value, label) => {
        setDisableBtn(true);
        reEnableButton();
        axios.post(`${SERVER_URL}/addException`, { value, label }, {
            headers: {
                authorization: user?.email || "none"
            }
        })
            .then(res => {
                reEnableButton();
                console.log("Response: ", res);
                setRefetch(!refetch);


            })
            .catch(function (e) {
                reEnableButton();
                console.log(e)
            })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {

        if (data !== "") {
            if ((data.battingTeam === data.firstTeamName || data.battingTeam === data.secondTeamName)) {
                axios.post(`${SERVER_URL}/currentStatus`, {
                    data: data
                },
                    {
                        headers: {
                            authorization: localStorage.getItem('userEmail')
                        }
                    })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(function (e) {
                        console.log(e)
                    })
            } else {
                window.alert("Batting Team do not exists. Have to be one of two playing team ")
                return;
            }
        }
        else {
            window.alert("Empty value won't be accepted!");
            return;
        }

    }

    const getStatus = () => {
        console.log(user?.email)
        axios.get(`${SERVER_URL}/currentStatus`, {
            headers: {
                authorization: user?.email || "None"
            }
        }
        )
            .then(res => {
                console.log("response: ", res.data);
                setCurrentStatus(res.data);
            })
            .catch(function (e) {
                console.log(e)
            })
    }
    // console.log(currentStatus?.totalRun);
    useEffect(() => {
        getStatus();
    }, [user])

    const form2 = useForm();
    const { handleSubmit: handleSubmit2, register: register2 } = form2;

    const onSubmitForm2 = (data) => {
        console.log(data);
        axios.post(`${SERVER_URL}/changeStatus`, { data: data }, {
            headers: {
                authorization: user?.email || "none"
            }
        })
            .then(res => {
                console.log("Response: ", res);
                setRefetch(!refetch);

            })
            .catch(function (e) {
                console.log(e)
            })
    };

    return (
        <div className={`mx-[10%] `}>

            <h1 className='text-6xl text-center font-bold mb-10'>Scoreboard Control Center</h1>
            {/* Add runs */}
            <div>
                <div className={` border border-1 shadow-lg p-5 rounded-lg bg-zinc-200`}>
                    <h1 className='text-3xl mb-4'>Manage Runs</h1>
                    <div className={`flex flex-row gap-2 `}>
                        {
                            runs.map((run, index) =>
                                <button disabled={disableBtn} onClick={() => addRun(run.value)} className={`${style.runs} shadow-lg rounded-full px-6 py-4 text-2xl border-black`}>
                                    {run.label}

                                </button>)
                        }
                    </div>
                    <br />
                    <br />
                    <div className={`flex flex-row gap-2 mt-2`}>
                        {
                            exception.map((item, index) =>
                                <button disabled={disableBtn} onClick={() => addException(item.value, item.label)} className={`${style.runs} shadow-lg rounded-full px-6 py-4 text-2xl  border-black`}>
                                    {item.label}
                                </button>)
                        }
                    </div>
                </div>
            </div>
            <h1 className='text-3xl mt-10'>Edit Values</h1>
            <form onSubmit={handleSubmit2(onSubmitForm2)}>
                <table className={`${style.table} mt-5 shadow-xl `}>
                    <div className={`flex justify-between p-8`}>
                        <div>
                            <tr>
                                <td>Edit Total Run: </td>
                                <td><input type='number' defaultValue={currentStatus?.totalRun} placeholder={currentStatus?.totalRun} {...register2("totalRun")} /> </td>
                                {/* <td className={`${style.buttonContainer}`}><button>Change</button></td> */}
                            </tr>
                            <tr>
                                <td>Edit Total Wicket: </td>
                                <td><input type='number' defaultValue={currentStatus?.totalWicket} placeholder={currentStatus?.totalWicket} {...register2("totalWicket")} /> </td>
                                {/* <td className={`${style.buttonContainer}`}><button>Change</button></td> */}
                            </tr>
                            <tr>
                                <td>Current Player 1: </td>
                                <td><input type='text' defaultValue={currentStatus?.currentTwoBatsmanInField?.batsman1?.name} placeholder={currentStatus?.currentTwoBatsmanInField?.batsman1?.name || "Empty"} {...register2("batsman1")} /> </td>
                                {/* <td className={`${style.buttonContainer}`}><button>Change</button></td> */}
                            </tr>
                            <tr>
                                <td>Current Player 2: </td>
                                <td><input type='text' defaultValue={currentStatus?.currentTwoBatsmanInField?.batsman2?.name} placeholder={currentStatus?.currentTwoBatsmanInField?.batsman2?.name || "Empty"} {...register2("batsman2")} /> </td>
                                {/* <td className={`${style.buttonContainer}`}><button>Change</button></td> */}
                            </tr>
                            <tr>
                                <td>Total Balls: </td>
                                <td><input type='number' defaultValue={currentStatus?.totalBall} placeholder={currentStatus?.totalBall} {...register2("totalBall")} /> </td>
                                {/* <td className={`${style.buttonContainer}`}><button>Change</button></td> */}
                            </tr>
                        </div>
                        <div>
                            <tr>
                                <td>Batting Team: </td>
                                <td><input type='text' defaultValue={currentStatus?.playingTeam?.team1} placeholder={currentStatus?.playingTeam?.team1} {...register2("battingTeam")} /> </td>
                                {/* <td className={`${style.buttonContainer}`}><button disabled={true}>Change</button></td> */}
                            </tr>

                            <input type="submit" />
                        </div>
                    </div>
                </table>
            </form>


            <h1 className='text-3xl mt-10'>Set Match Default</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className={`${style.table} mt-5 shadow-xl `}>
                    <div className={`flex justify-between p-8 flex-col w-[70%]`}>
                        <div>

                            {/* First Team  */}
                            <tr>
                                <td>First Team Name </td>
                                <td><input type='text' placeholder='' {...register("firstTeamName")} /> </td>
                            </tr>

                            {/* Second Team */}
                            <tr>
                                <td>Second Team Name </td>
                                <td><input type='text' placeholder='' {...register("secondTeamName")} /> </td>
                            </tr>

                            {/* Total Over */}
                            <tr>
                                <td>Total Over: </td>
                                <td><input type='Number' placeholder='' {...register("totalOver")} /> </td>
                            </tr>

                            {/* Batting Team */}
                            <tr>
                                <td>Batting Team: </td>
                                <td><input type='text' placeholder='' {...register("battingTeam")} /> </td>
                            </tr>

                        </div>
                        <div className={`w-[70%] p-8`}>
                            <input className={`bg-[#4b4b4b] text-white`} type='submit'></input>

                        </div>
                    </div >
                </table >
            </form >

        </div >
    )
}
