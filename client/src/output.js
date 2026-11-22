import Loader from './Loader';
import { connect } from 'react-redux'; 
import Ansi from "ansi-to-react";

function Output({ isCompiling, userOutput}) {
    return <div className="output" style={{height: '30%'}}>
    {isCompiling ? <Loader /> : <Ansi>{userOutput}</Ansi>}
    </div>
}

export default connect((state) => ({ isCompiling: state.isCompiling, userOutput: state.userOutput }))(Output);
