import { useEffect } from 'react';
import Input from './input';
import Output from './output';
import './style.css'
import './loader-style.css'

import { ACTIONS } from './actions';
import { connect } from 'react-redux'; 


function App() {

	return (
		<>
			<h1>MeetCode</h1>
			<div className='cont'>
				<Input />
				<Output />
			</div>
		</>
	)
}

const mapDispatchToProps = (dispatch) => {
	function setIsLoading(payload) {
		dispatch({ type: ACTIONS.SET_LOADING, payload });
	}
	function setLanguages(payload) {
		dispatch({ type: ACTIONS.SET_LANGUAGES, payload });
	}
	function setUserLanguage(payload) {
		dispatch({ type: ACTIONS.SET_USER_LANGUAGE, payload });
	}
	function setNetworkError(payload) {
		dispatch({ type: ACTIONS.SET_NETWORK_ERRORS, payload });
	}
	return { setIsLoading, setUserLanguage, setLanguages, setNetworkError };
}

export default connect(null, mapDispatchToProps)(App)
