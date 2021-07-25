import React from "react";
import { compareAsc, format } from 'date-fns'
import Result from "./result";
import { ITweet } from "../interfaces";

interface IResults {
    tweets: ITweet[], 
    allowDrop: boolean
    handleSave?: Function
}
function Results({ tweets, allowDrop, handleSave = ()=>{} }: IResults) {
    return (
        <ul className="results" 
        onDragOver={(ev)=> ev.preventDefault()}
        onDrop={
            (ev)=> {
                const tweet = ev.dataTransfer.getData('tweet')
                if( allowDrop ) handleSave( JSON.parse(tweet) )
            }
        }
            >
            {tweets.map((tweet: ITweet) => {
                return <Result key={tweet.id} tweet={tweet} />
            })}
        </ul>
    )
}

export default Results