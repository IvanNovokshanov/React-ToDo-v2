import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { getTodosFetch } from './api';
import { ITodo, List } from './models';

interface stateProps {
	todos: ITodo[];
}

export const App = () => {
	const todosSli = useSelector(state => state.todo.todos);

	const [todos, setTodos] = useState([]);
	useEffect(() => {
		(async () => {
			const response = await getTodosFetch();
			setTodos(response);
		})();
	}, [todosSli]);

	return (
		<div className="root">
			<AddTodo />
			<TodoList todos={todos} />
		</div>
	);
};
