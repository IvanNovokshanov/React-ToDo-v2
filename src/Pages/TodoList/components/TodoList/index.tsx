import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { getTodosThunk } from '../../../../store/todoSlice';
import { Todo } from '../Todo';
import classes from './style.module.css';
import { ITodo } from '../../../../models';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, getTodos } from '../../../../selectors/jira';
import { Popup } from '../Popup';

export const TodoList = () => {
	const dispatch: any = useDispatch();
	const { project } = useParams();

	const todosData = useSelector(getTodos);
	// console.log('todosData', todosData);

	const [isShow, setIsShow] = useState(false);
	const onClickCard = () => {
		console.log('CLICK');

		setIsShow(true);
	};
	const closePopup = () => {
		setIsShow(false);
	};

	useEffect(() => {
		dispatch(getTodosThunk());
	}, []);

	const filteredTasks = todosData.filter(
		(el: ITodo) => el.project === project
	);
	console.log('FILTER', filteredTasks);

	return (
		<>
			{isShow && <Popup closePopup={closePopup} />}
			<div>
				{filteredTasks?.map((el: ITodo) => (
					<Todo todo={el} onClickCard={onClickCard} key={el.id} />
				))}
			</div>
		</>
	);
};
