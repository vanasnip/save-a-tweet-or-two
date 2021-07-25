
// @ts-nocheck
import React from "react";
import { compareAsc, format } from 'date-fns'
import { ITweet } from "../interfaces";
import { isTemplateLiteral } from "@babel/types";
import { check } from "yargs";

function Result({ tweet }: { tweet: ITweet }) {
    const formatDate = (date: string) => format(new Date(date), 'd MMM yyyy')
    function mentionDetector(src: string) {
        const regx = /(@\w+)/gi
        const isMatch = src.matchAll(regx)
        const culprits = []
        function popMatch(matchFn: Function) {
            const res: any = matchFn()
            if (res.value) culprits.push({ item: res.value[0], index: res.value['index'] })
            if (!res.done) popMatch(matchFn)
        }
        popMatch(() => isMatch.next())
        console.log(culprits)
        const lastCulprit = culprits.length - 1
        const lastSrcIndex = src.length - 1
        let lastCheckedIndex = 0
        const reactElements = []
        culprits.forEach(function ({ item, index }, idx) {
            const itemLen = item.length
            let before = ''
            if (index > 0) {
                before = src.substring(lastCheckedIndex, index)
                const beforeRE = React.createElement('span', { id: `before-${index}-${idx}` }, before);
                const culpritRE = React.createElement('span', { id: `culprit-${index}-${idx}`, class: 'culprit' }, item);
                reactElements.push(beforeRE)
                reactElements.push(culpritRE)
                lastCheckedIndex = index + itemLen
            } else {
                const culpritRE = React.createElement('span', { id: `culprit-${index}-${idx}`, class: 'culprit' }, item);
                reactElements.push(culpritRE)
                lastCheckedIndex = itemLen
            }

            if (idx === lastCulprit) {
                const after = src.substring(lastCheckedIndex, lastSrcIndex)
                const afterRE = React.createElement('span', { id: `after-${index}-${idx}` }, after);
                reactElements.push(afterRE)
            }

        })

        console.log( reactElements)
        return reactElements.length ? reactElements : src

    }
    const { id, user: { name, screen_name, profile_image_url: img_url }, text, created_at } = tweet
    
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
            <p className="tweet col-12">{mentionDetector(text)}</p>
        </div>
        <div className="date col-2">{formatDate(created_at)}</div>
    </li>
}

export default Result