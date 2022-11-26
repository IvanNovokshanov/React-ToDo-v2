import React, { useState } from 'react';
import classes from './style.module.css';
import { useParams } from 'react-router-dom';
import { postTodoFetch } from '../../../../api';
import { useDispatch } from 'react-redux/es/exports';
import { addTodo } from '../../../../store/todoSlice';
import { nanoid } from 'nanoid';
import logo from '../../../../../public/images/pngegg.png';

export const AddTodo = () => {
	const { project } = useParams();
	const [titleTextValue, setTitleTextValue] = useState('');
	const [descriptionTextValue, setDescriptionTextValue] = useState('');
	const dispatch = useDispatch();
	const addTodoRed = () => {
		const todo = {
			id: nanoid(),
			project: project,
			title: titleTextValue,
			description: descriptionTextValue,
			completed: false,
			important: false,
			date: new Date().toLocaleString()
		};
		dispatch(addTodo(todo));
		postTodoFetch(todo);
		setTitleTextValue('');
		setDescriptionTextValue('');
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
					value={titleTextValue}
					placeholder="введите текст"
					onChange={e => setTitleTextValue(e.target.value)}
				/>
				<input
					className={classes.inputArea}
					type="text"
					value={descriptionTextValue}
					placeholder="введите текст"
					onChange={e => setDescriptionTextValue(e.target.value)}
				/>
				<i
					className="bi bi-plus-square buttonAdd"
					onClick={() => addTodoRed()}
				></i>
			</div>
		</>
	);
};
