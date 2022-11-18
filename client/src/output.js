import { useGlobalState } from "./gloabalState"
import Loader from './Loader'; 

export default function Output() {
    const { isCompiling, codeOutput } = useGlobalState();
    return <div className="output" style={{height: '30%'}}>
    {isCompiling ? <Loader /> : `$ ${codeOutput}`}     
    </div>
}