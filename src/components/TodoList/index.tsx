import React, { useState, useEffect, FC } from 'react';
import { Todo } from '../Todo';
import classes from './style.module.css';
import { ITodo, List } from '../../models';

interface todoProps {
	todos: ITodo[];
}

export const TodoList: FC<todoProps> = ({ todos }) => {
	const [filtred, setFiltred] = useState(todos);
	useEffect(() => {
		setFiltred(todos);
	}, [todos]);
	const filterTodo = (status: string) => {
		if (status === 'all') {
			setFiltred(todos);
		}
		if (status === 'completed') {
			const newArr = todos.filter(el => el.completed === true);
			setFiltred(newArr);
		}
		if (status === 'important') {
			const newArr = todos.filter(el => el.important === true);
			setFiltred(newArr);
		}
	};
	return (
		<div>
			<div className={classes.buttonGroup}>
				<button
					className={classes.button}
					onClick={() => filterTodo('all')}
				>
					Все
				</button>
				<button
					className={classes.button}
					onClick={() => filterTodo('completed')}
				>
					Готовые
				</button>
				<button
					className={classes.button}
					onClick={() => filterTodo('important')}
				>
					Важные
				</button>
			</div>
			{filtred.map(el => (
				<Todo todo={el} key={el.id} />
			))}
		</div>
	);
};
