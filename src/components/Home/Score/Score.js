import React, { useEffect, useState } from 'react'
import style from "./Score.module.css"
import axios from 'axios'
import { SERVER_URL, refetch } from '../../../variable'
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DataProvider, useData } from '../../Context/DataProvider';



export default function Score() {
    const { refetch, setRefetch, fetchData } = useData();
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (refetch) {
            fetchData();
            setRefetch(false);
        }
    }, [refetch, setRefetch, fetchData]);

    const [currentStatus, setCurrentStatus] = useState({
        playingTeam: {
            team1: "N/A",
            team2: "N/A"
        },
        battingTeam: "N/A",
        innings: 1,
        currentBowlerIndex: 0,
        currentTwoBatsmanInField: {
            batsman1: {
                name: ""
            },
            batsman2: {
                name: ""
            }
        },
        currentBatsman2: "",
        totalBall: 0,
        totalRun: 0,
        totalWicket: 0,
        runInCurrentOver: [-1, -1, -1, -1, -1, -1]
    });
    const runInCurrentOver = currentStatus.runInCurrentOver;


    const getStatus = async () => {
        console.log(user?.email)
        await axios.get(`${SERVER_URL}/currentStatus`, {
            headers: {
                authorization: user?.email || "None"
            }
        }
        )
            .then(res => {
                console.log("response: ", res.data);
                setCurrentStatus(res?.data);
                console.log("Total Balls: ", res?.data)
            })
            .catch(function (e) {
                console.log(e)
            })
    }
    useEffect(() => {
        getStatus();
        console.log("refetch")
    }, [user, refetch])

    useEffect(() => {
        const fetchDataAndStatus = async () => {
            await fetchData();
            getStatus();
        };

        if (refetch) {
            fetchDataAndStatus();
            setRefetch(false);
        }
    }, [user, refetch, setRefetch, fetchData, getStatus]);



    // const { batsman1, batsman2 } = currentStatus.currentTwoBatsmanInField;
    const addRun = (runValue) => {
        for (let i = 0; i < runInCurrentOver.length; i++) {
            const element = runInCurrentOver[i];
            if (element === -1) {
                runInCurrentOver[i] = runValue;
                return;
            }
        }
    }
    const ballToOver = (ball) => {
        const overs = ((((ball / 6)) - Math.floor((ball / 6))) * 6) / 10 + (Math.floor((ball / 6)));
        return ball % 6 === 0 ? parseInt(overs) : overs.toFixed(1);
    };

    // const undoBall
    return (
        <div className={`w-full `}>
            <h1 className='text-6xl font-bold text-center my-5'>BAS CRICKET TOURNAMENT SCOREBOARD</h1>
            <div className={`grid grid-cols-2 gap-10 mx-[10%] ${style.cardContainer}`}>
                {/* Left Side */}
                <div>
                    <div className={`${style.card} h-[50vh]`}>
                        <div>

                            {/* Batting Team */}
                            <h1 className={`${style.teamLabel}`}>{currentStatus?.battingTeam}</h1>
                            <div className={`${style.runInCard}`}>
                                <h1 className='text-[8rem] text-center'>{currentStatus?.totalRun || 0}-{currentStatus?.totalWicket || 0}</h1>
                                <h1 className='text-7xl pb-5 text-center'>({ballToOver(currentStatus?.totalBall)})</h1>
                            </div>
                        </div>
                    </div>

                    {currentStatus?.innings === 2 &&
                        <div className={`text-3xl flex flex-col mt-5 gap-3`}>
                            <p className={`${style.batsman}`}>{currentStatus?.currentTwoBatsmanInField?.batsman1?.name}</p>
                            <p className={`${style.batsman}`}>{currentStatus?.currentTwoBatsmanInField?.batsman2?.name}</p>
                        </div>
                    }
                </div>

                {/* Right Side */}
                {currentStatus?.innings === 1 ?
                    <div className={`h-[100%]  flex flex-col items-center justify-center`}>
                        <div className={`text-3xl flex flex-col mt-5 gap-3 w-full`}>
                            <p className={`${style.batsman}`}>{currentStatus?.currentTwoBatsmanInField?.batsman1?.name}</p>
                            <p className={`${style.batsman}`}>{currentStatus?.currentTwoBatsmanInField?.batsman2?.name}</p>
                        </div>
                        <div className={`text-3xl w-[100%]  flex justify-center mt-3 mb-10`}>
                            <div className={` flex flex-wrap  items-center h-[100%] pb-4 gap-1 `}>
                                {
                                    runInCurrentOver.map((ball, index) =>
                                        <span className={`bg-black rounded-full text-white px-5 py-6 font-bold text-[4rem]`}>

                                            {ball === -1 ?
                                                <p className={`text-black`}>0</p>
                                                :
                                                ball
                                            }

                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={`${style.card} h-[50vh]`}>
                            <h1 className={`${style.teamLabel}`}>To Win</h1>
                            <div className={` grid grid-cols-2 text-center gap-10 h-[70%] justify-center items-center`}>
                                <div className={`${style.runInCard} p-2`}>
                                    <p className={`text-7xl font-semibold mb-10`}>Runs</p>
                                    <p className={`text-7xl`}>100</p>
                                </div>
                                <div className={`${style.runInCard} p-2`}>
                                    <p className={`text-7xl font-semibold mb-10`}>Balls</p>
                                    <p className={`text-7xl`}>80</p>
                                </div>
                            </div>
                        </div>
                        <div className={`text-3xl flex justify-center mt-3 mb-10`}>
                            <div className={` flex w-[100%]  flex-row justify-between items-center h-[100%] pb-4 `}>
                                {
                                    runInCurrentOver &&
                                    runInCurrentOver.map((ball, index) =>
                                        <span className={`bg-black rounded-full text-white px-5 py-6 font-bold text-[4rem]`}>

                                            {ball === -1 ?
                                                <p className={`text-black`}>0</p>
                                                :
                                                ball
                                            }

                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className={`my-5`}>
                <div className={`mx-[10%] my-2 bg-white  text-center rounded-lg`}>
                    <h1 className='text-7xl p-5 font-bold '>{currentStatus?.playingTeam?.team1} vs {currentStatus?.playingTeam?.team2} </h1>
                </div>
            </div>
        </div>
    )
}
