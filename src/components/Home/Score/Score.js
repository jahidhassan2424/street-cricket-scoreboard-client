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

    return (
        <div className={`w-full `}>
            <div className={`absolute bottom-0 text-center m-2 w-full`}>
                <div className={`${style.teamInfoContainer} `}>

                    <div>
                        {/* Batting Team */}
                        <div className={`flex flex-row `}>
                            <div className={`${style.team1Name} border-1 border-zinc-500 border p-5 rounded-lg min-w-[20%]`}>
                                <p className={`font-bold text-6xl`}>{currentStatus.team1Name}</p>
                            </div>
                            <div className={`${style.run} border-1 border-zinc-500 border p-5 rounded-lg min-w-[20%]`}>
                                <p className={`font-bold text-6xl`}>{currentStatus.totalRun}-{currentStatus.totalWicket}</p>
                                <p>({ballToOver(currentStatus.numberOfBall)})</p>
                            </div>
                            {/* Batsman */}
                            <div className={`grid grid-flow-row items-center min-w-[20%]`}>
                                <div className={`${style.batsman} flex flex-row gap-16 `}>
                                    <p>{batsman1.name} {batsman1.onStrike && "*"}</p>
                                    <p>{batsman1.run} ({batsman1.ballPlayed})</p>
                                </div>
                                <div className={`${style.batsman} flex flex-row gap-16 `}>
                                    <p>{batsman2.name} {batsman2.onStrike && "*"}</p>
                                    <p>{batsman2.run} ({batsman2.ballPlayed})</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bowing Team */}
                    <div className={`flex justify-end m-5 gap-5 `}>
                        <div className={`min-w-[30%]`}>
                            <div className={`flex flex-row justify-between gap-16 items-start`}>
                                <p className={`text-2xl`}>{bowlersInfo[currentStatus.currentBowlerIndex].name}</p>
                                <p className={`text-2xl`}>
                                    {bowlersInfo[currentStatus.currentBowlerIndex].wicketTaken}
                                    -{bowlersInfo[currentStatus.currentBowlerIndex].totalRunGiven}({ballToOver(bowlersInfo[currentStatus.currentBowlerIndex].totalBallThrown)})</p>
                            </div>
                            <div className={` flex w-[full] justify-between items-center h-[100%] pb-4 `}>
                                {
                                    runInCurrentOver.map((ball, index) =>
                                        <span className={`bg-black rounded-full text-white px-2 font-bold text-3xl`}>

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
                        <div className={`${style.team1Name} border-1 border-zinc-500 border p-5 rounded-lg min-w-[20%]`}>
                            <p className={`font-bold text-6xl`}>{currentStatus.team2name}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
