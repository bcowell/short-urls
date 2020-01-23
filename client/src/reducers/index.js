import { combineReducers } from 'redux';

function dummyReducerA() { return true }
function dummyReducerB() { return false }

const rootReducer = combineReducers({
    dummyReducerA,
    dummyReducerB
})

export default rootReducer;