import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
	getTodosFetch,
	postTodoFetch,
	completeTodoFetch,
	importantTodoFetch,
	deleteTodoFetch
} from '../../api';
import { ITodo } from '../../models';
import { AppDispatch } from '../store';

type CurrentType = {
	todos: ITodo[];
};

const initialState: CurrentType = {
	todos: []
};

export const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action) => ({
			...state,
			todos: state.todos.concat(action.payload)
		}),
		toggleCompleted: (state, action) => ({
			...state,
			todos: state.todos.map(obj =>
				obj.id === action.payload
					? { ...obj, completed: !obj.completed }
					: obj
			)
		}),
		importantCompleted: (state, action) => ({
			...state,
			todos: state.todos.map(obj =>
				obj.id === action.payload
					? { ...obj, completed: !obj.completed }
					: obj
			)
		}),
		deleteTodo: (state, action) => ({
			...state,
			todos: state.todos.filter(el => el.id !== action.payload)
		})
	}
});

export const toggleThunk =
	(id: string, todo: ITodo) => async (dispatch: AppDispatch) => {
		const newTodo = { ...todo, completed: !todo.completed };
		await completeTodoFetch(id, newTodo);
		dispatch(toggleCompleted(id));
	};
export const importantThunk =
	(id: string, todo: ITodo) => async (dispatch: AppDispatch) => {
		const newTodo = { ...todo, important: !todo.important };
		await importantTodoFetch(id, newTodo);
		dispatch(importantCompleted(id));
	};
export const deleteThunk = (id: string) => async (dispatch: AppDispatch) => {
	await deleteTodoFetch(id);
	dispatch(deleteTodo(id));
};

export const { addTodo, toggleCompleted, importantCompleted, deleteTodo } =
	todoSlice.actions;

export const todoSliceReducer = todoSlice.reducer;
