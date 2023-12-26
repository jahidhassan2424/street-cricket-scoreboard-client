import React from 'react'
import style from "./Score.module.css"


export default function Score() {
    const runInCurrentOver = [-1, -1, -1, -1, -1, -1];
    const bowlersInfo = [
        {
            name: "Taskin",
            totalBallThrown: 8,
            totalRunGiven: 13,
            wicketTaken: 0,
        }
    ];
    const currentStatus = {
        currentBowlerIndex: 0,
        onStrikeBatsman: "",
        currentTwoBatsmanInField: {
            batsman1: {
                name: "Player 1",
                run: 0,
                ballPlayed: 0,
                onStrike: true
            },
            batsman2: {
                name: "Player 2",
                run: 0,
                ballPlayed: 0,
                onStrike: false
            },
        },
        numberOfBall: 56,
        numberOfOver: 0,
        team1Name: "NZ",
        team2name: "BAN",
        totalRun: 0,
        totalWicket: 1
    }
    const { batsman1, batsman2 } = currentStatus.currentTwoBatsmanInField;
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
        return Math.round((ball / 6) * 10) / 10;
    };

    // const undoBall

    return (
        <div className={`w-full `}>
            <h1 className='text-6xl font-bold text-center my-5'>BAS CRICKET TOURNAMENT SCOREBOARD</h1>
            <div className={`grid grid-cols-2 gap-10 mx-[10%] ${style.cardContainer}`}>
                {/* Left Side */}
                <div>
                    <div className={`${style.card} h-[55vh]`}>
                        <div>
                            <h1 className={`${style.teamLabel}`}>Team Rebel</h1>
                            <div className={`${style.runInCard}`}>
                                <h1 className='text-[12rem] text-center'>5-0</h1>
                            </div>
                        </div>
                    </div>
                    <div className={`text-3xl flex flex-col mt-5 gap-3`}>
                        <p className={`${style.batsman}`}>Batsman 1</p>
                        <p className={`${style.batsman}`}>Batsman 2</p>
                    </div>
                </div>

                {/* Right Side */}
                <div>
                    <div className={`${style.card} h-[55vh]`}>
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
                        <div className={` flex w-[100%] justify-between items-center h-[100%] pb-4 `}>
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
            </div>
        </div>
    )
}
