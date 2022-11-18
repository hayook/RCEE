import { createContext, useContext, useState, useEffect } from 'react';

const globalStateContext = createContext();

export const useGlobalState = () => useContext(globalStateContext);

export function GlobalStateProvider(props) {

    useEffect(() => {
        fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(data => {
            setIsLoading(false);
            setLanguages(data.languages)
            setUserLanguage(data.languages[0])
        })
        .catch(err => {
            setIsLoading(false);
            setNetworkError(true); 
        })
    }, [])

    const [isCompiling, setIsCompiling] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const [networkError, setNetworkError] = useState(false); 

    const [languages, setLanguages] = useState([]);
    const [userLanguage, setUserLanguage] = useState({})
    const [codeOutput, setCodeOutput] = useState('output here');

    const handleValue = ({ target }) => {
        setUserLanguage({...userLanguage, userCode: target.value})
    }

    const handleRun = async () => {
        setIsCompiling(true);
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ userLanguage  })
            });
            const result = await response.json();
            setCodeOutput(result.output);
        } catch (err) {
            setCodeOutput('Notwork Error');  
        }
        setIsCompiling(false);
    }

    const value = {
        isCompiling,
        setIsCompiling,
        codeOutput,
        setCodeOutput,
        handleRun,
        handleValue,
        isLoading, 
        setIsLoading,
        networkError, 
        setNetworkError,
        languages, 
        setLanguages,
        userLanguage,
        setUserLanguage
    }

    return (
        <globalStateContext.Provider value={value}>
            {props.children}
        </globalStateContext.Provider>
    )

}