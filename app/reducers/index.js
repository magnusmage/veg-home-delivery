import { combineReducers } from 'redux';
import * as authReducer from './auth';
import * as productReducer from './veggies';
import * as orderReducer from './orders';


const appReducer = combineReducers(Object.assign(
    authReducer,
    productReducer,
    orderReducer
));

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
