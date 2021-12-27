import {combineReducers} from "redux";

import {authenticationReducer} from "./Authentication/reducers";
import {gameReducer} from "./Game/reducers";
import {reducer as formReducer} from 'redux-form';


const rootReducer = combineReducers({
    authenticate: authenticationReducer,
    game: gameReducer,
    form: formReducer
});

export default rootReducer