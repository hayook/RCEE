import Loader from './Loader';
import NetworkError from './NetworkError'
import Languages from './Languages';
import { connect } from 'react-redux'; 
import { ACTIONS } from './actions'; 


function Input({ dispatch, userLanguage, isLoading, networkError }) {

    const handleValue = ({ target }) => {
        dispatch({ type: ACTIONS.SET_USER_LANGUAGE, payload: {...userLanguage, userCode: target.value}});
    }

    const handleRun = async () => {
        dispatch({ type: ACTIONS.SET_COMPILING, payload: true});
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ userLanguage  })
            });
            const result = await response.json();
            dispatch({ type: ACTIONS.SET_USER_OUTPUT, payload: result.output})
        } catch (err) {
            dispatch({ type: ACTIONS.SET_USER_OUTPUT, payload: 'Network Error'});   
        }
        dispatch({ type: ACTIONS.SET_COMPILING, payload: false});
    }

    return (
        <div className="input">
            {
                isLoading ? <Loader /> :
                    networkError ? <NetworkError /> :
                        <>
                            <Languages />
                            <textarea className="code" autoFocus onChange={handleValue} value={userLanguage.userCode}></textarea>
                            <button className="runCode" onClick={handleRun}>Run</button>
                        </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const { isLoading, networkError, userLanguage } = state; 
    return { isLoading, userLanguage, networkError}; 
}; 
export default connect(mapStateToProps)(Input); 

