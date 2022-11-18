import LangItem from './LangItem'; 
import { connect } from 'react-redux';

function Languages({ languages }) {

    return (
        <ul className="languagesBar">
            {
                languages.map(lang => {
                    const { langId, name } = lang;
                    return <LangItem key={langId} langId={langId} name={name} />
                })
            }
        </ul>
    )
}

const mapStateToProps = (state) => ({ languages: state.languages });
export default connect(mapStateToProps)(Languages);