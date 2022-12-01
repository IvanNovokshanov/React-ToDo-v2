import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/Home/components/HomePage';
import { AddTodo } from './Pages/TodoList/components/AddTodo';
import { TodoList } from './Pages/TodoList/components/TodoList';
import { getTodosThunk } from './store/todoSlice';
import { useDispatch } from 'react-redux';

export const App = () => {
	const dispatch: any = useDispatch();

	useEffect(() => {
		dispatch(getTodosThunk());
	}, []);

	return (
		<div className="root">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/task/:project"
					element={
						<>
							<AddTodo />
							<TodoList />
						</>
					}
				/>
			</Routes>
		</div>
	);
};
