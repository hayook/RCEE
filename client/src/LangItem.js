import { connect } from 'react-redux';
import { ACTIONS } from './actions'; 

function LangItem({ dispatch, langId, name, languages, userLanguage }) {

    const chooseLanguage = () => {
        dispatch({ type: ACTIONS.SET_USER_LANGUAGE, payload: languages.filter(lang => lang.langId === langId)[0]});
    }
    
    return (
        <li onClick={chooseLanguage} className={userLanguage.langId === langId ? 'active' : ''}>{name}</li>
    )
}

const mapStateToProps = (state) => ({ languages: state.languages, userLanguage: state.userLanguage });
export default connect(mapStateToProps)(LangItem);