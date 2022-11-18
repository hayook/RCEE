import { useGlobalState } from "./gloabalState"
import Loader from './Loader';
import NetworkError from './NetworkError'
import Languages from './Languages'; 

export default function Input() {
    const {
        handleKeyDown,
        handleRun,
        handleValue,
        userLanguage,
        isLoading, 
        networkError
    } = useGlobalState();
    return (
        <div className="input">
            {
                isLoading ? <Loader /> :
                    networkError ? <NetworkError /> :
                        <>
                            <Languages />
                            <textarea className="code" autoFocus onKeyDown={handleKeyDown} onChange={handleValue} value={userLanguage.userCode}></textarea>
                            <button className="runCode" onClick={handleRun}>Run</button>
                        </>
            }
        </div>
    )
}