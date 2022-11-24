// import { combineReducers, configureStore } from '@reduxjs/toolkit';

// const rootReducer = combineReducers({});

// export const setupStore = () => {
// 	return configureStore({
// 		reducer: rootReducer
// 	});
// };

import { configureStore } from '@reduxjs/toolkit';
import { todoSliceReducer } from './todoSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
	reducer: {
		todo: todoSliceReducer
		// filtred: filtredSlice
	},
	middleware: [thunk]
});
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
