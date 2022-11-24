import React, { FC } from 'react';
import classes from './style.module.css';
import { useDispatch } from 'react-redux';
import {
	toggleThunk,
	importantThunk,
	deleteThunk
} from '../../store/todoSlice';
import { ITodo } from '../../models';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface todoProps {
	todo: ITodo;
}

export const Todo: FC<todoProps> = ({ todo }) => {
	const dispatch: any = useDispatch();
	const toggleTodoButton = (id: string) => {
		dispatch(toggleThunk(id, todo));
	};
	const importantTodoButton = (id: string) => {
		dispatch(importantThunk(id, todo));
	};
	const deleteTodoButton = (id: string) => {
		dispatch(deleteThunk(id));
	};
	return (
		<div className={classes.todo}>
			<div className={todo.important ? classes.imp : classes.not}>
				<p className={todo.completed ? classes.done : classes.not}>
					{todo.title}
				</p>
			</div>
			<div className={classes.buttonGroup}>
				<p className={classes.date}>{todo.date}</p>
				<i
					className="bi bi-check-square toggleButton"
					onClick={() => toggleTodoButton(todo.id)}
				></i>
				<i
					className="bi bi-exclamation-square importantButton "
					onClick={() => importantTodoButton(todo.id)}
				></i>
				<i
					className="bi bi-trash deleteButton"
					onClick={() => deleteTodoButton(todo.id)}
				></i>
			</div>
		</div>
	);
};
