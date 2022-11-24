import React, { useState, useEffect, FC } from 'react';
import classes from './style.module.css';
import { postTodoFetch, getTodosFetch } from '../../api';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addTodo } from '../../store/todoSlice';
import { nanoid } from 'nanoid';
import logo from '../../../public/images/pngegg.png';

export const AddTodo = () => {
	const [textValue, setTextValue] = useState('');
	const dispatch = useDispatch();
	const addTodoRed = () => {
		const todo = {
			id: nanoid(),
			title: textValue,
			completed: false,
			important: false,
			date: new Date().toLocaleString()
		};
		dispatch(addTodo(todo));
		postTodoFetch(todo);
		setTextValue('');
	};

	return (
		<>
			<div className={classes.imgBlock}>
				<img src={logo} className={classes.img} alt="" />
				<h3 className={classes.title}>React ToDo</h3>
			</div>
			<div className={classes.addTodoBlock}>
				<input
					className={classes.inputArea}
					type="text"
					value={textValue}
					placeholder="введите текст"
					onChange={e => setTextValue(e.target.value)}
				/>
				<i
					className="bi bi-plus-square buttonAdd"
					onClick={() => addTodoRed()}
				></i>
			</div>
		</>
	);
};
