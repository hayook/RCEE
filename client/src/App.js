import { useEffect } from 'react';
import Input from './input';
import Output from './output';
import './style.css'
import './loader-style.css'

import { ACTIONS } from './actions';
import { connect } from 'react-redux'; 


function App({ setIsLoading, setUserLanguage, setLanguages, setNetworkError }) {

	useEffect(() => {

		// I can put this & all the funcitons of the click event in the reducer
		fetch('http://localhost:5000/')
			.then(res => res.json())
			.then(data => {
				// dispatch({ type: ACTIONS.SET_LOADING, payload: false });
				setIsLoading(false); 
				// dispatch({ type: ACTIONS.SET_LANGUAGES, payload: data.languages });
				setLanguages(data.languages);
				// dispatch({ type: ACTIONS.SET_USER_LANGUAGE, payload: data.languages[0] });
				setUserLanguage(data.languages[0]);
			})
			.catch(() => {
				// dispatch({ type: ACTIONS.SET_LOADING, payload: false });
				setIsLoading(false);
				// dispatch({ type: ACTIONS.SET_NETWORK_ERRORS, payload: true });
				setNetworkError(true);
			})
	}, [])

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