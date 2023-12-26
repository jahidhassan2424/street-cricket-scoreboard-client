import React from 'react'
import style from "./Manage.module.css"

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
    return (
        <div>
            {/* Add runs */}
            <div>
                <div className={`flex flex-row gap-2 `}>
                    {
                        runs.map((run, index) =>
                            <span onClick={() => addRun(run.value)} className={`${style.runs} border border-1 rounded-full px-6 py-4 text-2xl `}>
                                {run.label}

                            </span>)
                    }
                    <br />
                    <br />
                </div>
                <div className={`flex flex-row gap-2 mt-10`}>
                    {
                        exception.map((run, index) =>
                            <p onClick={() => addRun(run.value)} className={`${style.runs} border border-1 rounded-full px-6 py-4 text-2xl `}>
                                {run.label}

                            </p>)
                    }
                </div>
            </div>
        </div>
    )
}
