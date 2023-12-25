import React from 'react'
import style from "./Home.module.css"
import Score from './Score/Score'
import Controller from './Controller/Controller'

export default function Home() {
    return (
        <div>
            <Controller />
            <Score />
        </div>
    )
}
