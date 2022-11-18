import Loader from './Loader';
import { connect } from 'react-redux'; 

function Output({ isCompiling, userOutput}) {
    return <div className="output" style={{height: '30%'}}>
    {isCompiling ? <Loader /> : `$ ${userOutput}`}
    </div>
}

export default connect((state) => ({ isCompiling: state.isCompiling, userOutput: state.userOutput }))(Output);
