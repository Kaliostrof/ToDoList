import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { addReducer, appReducer, filterReducer, updateReducer } from './reducer';
import { thunk } from 'redux-thunk';

const reducer = combineReducers({
	appState: appReducer,
	filtredState: filterReducer,
	addState: addReducer,
	updateState: updateReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
