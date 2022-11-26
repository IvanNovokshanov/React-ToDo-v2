// import { combineReducers, configureStore } from '@reduxjs/toolkit';

// const rootReducer = combineReducers({});

// export const setupStore = () => {
// 	return configureStore({
// 		reducer: rootReducer
// 	});
// };
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import { todoSliceReducer } from './todoSlice';
import { projectSliceReducer } from './projectsSlice';
import thunk from 'redux-thunk';
const composeEnhancers = composeWithDevTools({});

export const store = configureStore({
	reducer: {
		todo: todoSliceReducer,
		jira: projectSliceReducer
	},
	middleware: [thunk]
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
