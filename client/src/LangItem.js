import { useState, useEffect } from 'react'; 
import { useGlobalState } from './gloabalState'

export default function LangItem({langId, name}) {

    const { userLanguage, setUserLanguage, languages } = useGlobalState(); 

    const chooseLanguage = () => {
        setUserLanguage(languages.filter(lang => lang.langId === langId)[0]); 
    }
    
    return (
        <li onClick={chooseLanguage} className={userLanguage.langId === langId ? 'active' : ''}>{name}</li>
    )
}