import { useState } from 'react'
import { useGlobalState } from "./gloabalState"
import LangItem from './LangItem'; 

export default function Languages() {

    const { languages } = useGlobalState();

    return (
        <ul className="languagesBar">
            {
                languages.map(lang => {
                    const { langId, name } = lang;
                    return <LangItem key={langId} langId={langId} name={name} />
                })
            }
        </ul>
    )
}