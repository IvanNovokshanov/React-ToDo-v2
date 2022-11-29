import React, { FC, useState } from 'react';
import style from './style.module.css';
import { useDispatch } from 'react-redux';
import {
	toggleThunk,
	importantThunk,
	deleteThunk
} from '../../../../store/todoSlice';
import { ITodo } from '../../../../models';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface todoProps {
	task: ITodo;
	onClickCard: (todo: ITodo) => void;
}

export const Todo: FC<todoProps> = ({ task, onClickCard }) => {
	const [cardList, setCardList] = useState();
	const [currentCard, setCurrentCard] = useState(null);
	console.log('!!!', cardList);

	const dispatch: any = useDispatch();
	const toggleTodoButton = (id: string) => {
		console.log('TOGL');

		dispatch(toggleThunk(id, task));
	};
	const importantTodoButton = (id: string) => {
		console.log('IMPORT');
		dispatch(importantThunk(id, task));
	};
	const deleteTodoButton = (id: string) => {
		dispatch(deleteThunk(id));
	};

	return (
		<div className={style.todo}>
			<div onClick={() => onClickCard(task)}>
				<div className={task.important ? style.imp : style.not}>
					<div className={task.completed ? style.done : style.not}>
						<p className={style.title_text}>{task.title}</p>
					</div>
				</div>
			</div>
			<div className={style.buttonGroup}>
				<p className={style.date}>{task.date}</p>
				<i
					className="bi bi-check-square toggleButton"
					onClick={() => toggleTodoButton(task.id)}
				></i>
				<i
					className="bi bi-exclamation-square importantButton "
					onClick={() => importantTodoButton(task.id)}
				></i>
				<i
					className="bi bi-trash deleteButton"
					onClick={() => deleteTodoButton(task.id)}
				></i>
			</div>
		</div>
	);
};
