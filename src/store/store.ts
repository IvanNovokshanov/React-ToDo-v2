import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { todoSliceReducer } from './todoSlice';
import { projectSliceReducer } from './projectsSlice';
import thunk from 'redux-thunk';
import { StoreState } from '../models';

export const storeReducer = combineReducers({
	todo: todoSliceReducer,
	jira: projectSliceReducer
});

const configureStore = (): Store<StoreState> => {
	const middleware = [thunk];
	const enhancers = [applyMiddleware(...middleware)];
	const store = createStore(storeReducer, composeWithDevTools(...enhancers));

	return store;
};

export const store = configureStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
