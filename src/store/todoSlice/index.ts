import { createSlice } from '@reduxjs/toolkit';
import { getTodosFetch } from '../../api';
import { useDispatch } from 'react-redux';
import {
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
		getTodosAction: (state, action) => ({
			...state,

			todos: action.payload
		}),
		statusUpdater: (state, action) => ({
			...state,
			todos: state.todos.map(el =>
				el.id === action.payload.currentId
					? { ...el, status: action.payload.currentTodo.status }
					: el
			)
		}),
		descriptionUpdater: (state, action) => ({
			...state,
			todos: state.todos.map(el =>
				el.id === action.payload.currentId
					? { ...el, description: action.payload.currentDescription }
					: el
			)
		}),
		titleUpdater: (state, action) => ({
			...state,
			todos: state.todos.map(el =>
				el.id === action.payload.currentId
					? { ...el, title: action.payload.currentTitle }
					: el
			)
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
					? { ...obj, important: !obj.important }
					: obj
			)
		}),
		deleteTodo: (state, action) => ({
			...state,
			todos: state.todos.filter(el => el.id !== action.payload)
		})
	}
});

export const getTodosThunk = () => async (dispatch: AppDispatch) => {
	const response = await getTodosFetch();
	dispatch(getTodosAction(response));
};

export const toggleThunk =
	(id: string, todo: ITodo) => async (dispatch: AppDispatch) => {
		const newTodo = { ...todo, completed: !todo.completed };
		await completeTodoFetch(id, newTodo);
		dispatch(toggleCompleted(id));
	};

export const statusUpdateThunk =
	(id: string, todo: ITodo) => async (dispatch: AppDispatch) => {
		const newPayload = {
			currentId: id,
			currentTodo: todo
		};
		await completeTodoFetch(id, todo);
		dispatch(statusUpdater(newPayload));
	};

export const descriptionUpdateThunk =
	(id: string, todo: ITodo, text: string) =>
	async (dispatch: AppDispatch) => {
		const newPayload = {
			currentId: id,
			currentTodo: todo,
			currentDescription: text
		};
		const newTodo = { ...todo, description: text };
		await completeTodoFetch(id, newTodo);
		dispatch(descriptionUpdater(newPayload));
	};
export const titleUpdateThunk =
	(id: string, todo: ITodo, text: string) =>
	async (dispatch: AppDispatch) => {
		const newPayload = {
			currentId: id,
			currentTodo: todo,
			currentTitle: text
		};
		const newTodo = { ...todo, title: text };
		await completeTodoFetch(id, newTodo);
		dispatch(titleUpdater(newPayload));
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

export const {
	addTodo,
	toggleCompleted,
	importantCompleted,
	deleteTodo,
	getTodosAction,
	statusUpdater,
	descriptionUpdater,
	titleUpdater
} = todoSlice.actions;

export const todoSliceReducer = todoSlice.reducer;
