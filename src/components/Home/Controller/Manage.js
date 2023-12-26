import React from 'react'
import style from "./Manage.module.css"
import { SERVER_URL } from '../../../variable'
import axios from 'axios'

export default function Manage() {
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


    const addRun = (run) => {
        console.log(run);
    }
    const currentStatus = {
        playingTeam: {
            team1: "REBEL",
            team2: "TITAN"
        },
        battingTeam: "Team Rebel",
        innings: 1,
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
        totalBall: 56,
        totalRun: 0,
        totalWicket: 1
    }


    const changeFirstTeamName = (name) => {
        if (name !== "") {
            axios.post(`${SERVER_URL}/status/firstTeamName/:${name}`, {
            }, {
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
            window.prompt("Empty value won't be accepted!");
        }
    }
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
                                <span onClick={() => addRun(run.value)} className={`${style.runs} border border-1 rounded-full px-6 py-4 text-2xl border-black`}>
                                    {run.label}

                                </span>)
                        }
                    </div>
                    <br />
                    <br />
                    <div className={`flex flex-row gap-2 mt-2`}>
                        {
                            exception.map((run, index) =>
                                <p onClick={() => addRun(run.value)} className={`${style.runs} border border-1 rounded-full px-6 py-4 text-2xl  border-black`}>
                                    {run.label}

                                </p>)
                        }
                    </div>
                </div>
            </div>
            <h1 className='text-3xl mt-10'>Edit Values</h1>
            <table className={`${style.table} mt-5 shadow-xl `}>
                <div className={`flex justify-between p-8`}>
                    <div>
                        <tr>
                            <td>Edit Total Run: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Edit Total Wicket: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Current Player 1: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Current Player 2: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Total Balls: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                    </div>
                    <div>
                        <tr>
                            <td>Current Playing Team </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Edit Total Wicket: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Current Player 1: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Current Player 2: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                        <tr>
                            <td>Total Balls: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>
                    </div>
                </div>
            </table>


            <h1 className='text-3xl mt-10'>Set Match Default</h1>
            <table className={`${style.table} mt-5 shadow-xl `}>
                <div className={`flex justify-between p-8`}>
                    <div>

                        {/* First Team  */}
                        <tr>
                            <td>First Team Name </td>
                            <td><input type='text' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>

                        {/* Second Team */}
                        <tr>
                            <td>Second Team Name </td>
                            <td><input type='text' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>

                        {/* Total Over */}
                        <tr>
                            <td>Total Over: </td>
                            <td><input type='Number' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>

                        {/* Batting Team */}
                        <tr>
                            <td>Batting Team: </td>
                            <td><input type='text' placeholder='' /> </td>
                            <td className={`${style.buttonContainer}`}><button>Change</button></td>
                        </tr>

                    </div>

                </div>
            </table>
        </div>
    )
}
