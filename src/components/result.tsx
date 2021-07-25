import React from "react";
import { compareAsc, format } from 'date-fns'
import { ITweet } from "../interfaces";

function Result({ tweet }: {tweet: ITweet}) {
    const formatDate = (date: string) => format(new Date(date), 'd MMM yyyy')
    function mentionDetector(source: string) {
        const regx = /(@\w+)/
        const isMatch = source.match(regx)

        if (!isMatch) return source
        // const indexes = [source.matchAll(new RegExp(regx, 'gi'))].map(a => {
        //     console.log(a)
        //     return a
        // });

    }
    const { id, user: { name, screen_name, profile_image_url: img_url }, text, created_at } = tweet
    mentionDetector(text)
    return <li
        key={id}
        className="result row"
        draggable="true"
        onDragStart={(ev: any) => {
            ev.dataTransfer.setData('tweet', JSON.stringify(tweet))
            // debugger
        }}

    >
        <div className="avatar-container col-2">
            <img src={img_url} alt="" />

        </div>
        <div className="details col-8 row">
            <h5 className="col-12">{name} {<span className="handle">@{screen_name}</span>}</h5>
            <p className="tweet col-12">{text}</p>
        </div>
        <div className="date col-2">{formatDate(created_at)}</div>
    </li>
}

export default Result