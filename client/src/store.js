import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {
    languages: [],
    userLanguage: {}, 
    networkError: false, 
    isLoading: true,
    isCompiling: false,
    userOutput: 'Output Here',
};

export const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



/* How Redux Works : 

    1 - execute createStore() function
    2 - store the value in the store object with undefined state property
    3 - execute the reducer() function 
        update the state 
        return the new state
    4 - update the store 
    5 - wrap the App using Provider component
    6 - all the components inside the Provider have access the the store property in Provider
    7 - connect()(myComponent) 
        take my component and passes to it props via mapStateToProps & mapDispatchToProps
        return a new component have access to the store 
        
    :: For a big app 
        - Refactoring for a cleaner code 
        - Combine reducers  
        - Actions creators 
        - Nest states to create a state tree 
        - Debbuging using Redux Devtools 

*/  