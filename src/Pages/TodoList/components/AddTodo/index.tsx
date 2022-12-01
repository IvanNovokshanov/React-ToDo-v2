import React, { useState } from 'react';
import style from './style.module.css';
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
			status: 'Queue',
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
			<div className={style.imgBlock}>
				<img src={logo} className={style.img} alt="" />
				<h3 className={style.title}>React ToDo v2</h3>
			</div>
			<div className={style.addTodoBlock}>
				<div className="mb-3">
					<label className="form-label">Заголовок задачи</label>
					<input
						type="text"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="введите текст"
						value={titleTextValue}
						onChange={e => setTitleTextValue(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label
						htmlFor="exampleFormControlTextarea1"
						className="form-label"
					>
						Описание задачи
					</label>
					<textarea
						className="form-control"
						id="exampleFormControlTextarea1"
						rows={4}
						placeholder="введите текст"
						value={descriptionTextValue}
						onChange={e => setDescriptionTextValue(e.target.value)}
					></textarea>
				</div>
				<div className={style.btn}>
					<button
						type="button"
						className="w-100 btn btn-success btn-lg btn-block"
						onClick={() => addTodoRed()}
					>
						Создать задачу
					</button>
				</div>
			</div>
		</>
	);
};
