import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import { ITodo, Board } from '../../../../models';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../../../selectors/jira';
import { Popup } from '../Popup';
import { statusUpdateThunk } from '../../../../store/todoSlice';

export const TodoList = () => {
	const iTodo: ITodo = {
		id: '',
		project: '',
		status: '',
		title: '',
		description: '',
		completed: false,
		important: false,
		date: ''
	};
	//State
	const dispatch: any = useDispatch();
	const { project } = useParams();
	const [isShow, setIsShow] = useState(false);
	const [dataPopup, setDataPopup] = useState<ITodo>(iTodo);

	const todosData = useSelector(getTodos);
	const filteredTasks = todosData.filter(el => el.project === project);

	// Popup

	const onClickCard = (task: ITodo) => {
		setIsShow(true);
		setDataPopup(task);
	};
	const closePopup = () => {
		setIsShow(false);
	};

	// Board

	const boardInitialState: Board[] = [
		{ id: 1, title: 'Queue', items: [iTodo] },
		{ id: 2, title: 'Development', items: [iTodo] },
		{ id: 3, title: 'Done', items: [iTodo] }
	];

	const [boards, setBoards] = useState(boardInitialState);

	const [currentBoard, setCurrentBoard] = useState<Board>(
		boardInitialState[0]
	);
	const [currentTodo, setCurrentTodo] = useState<ITodo>(iTodo);

	function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const { className, style } = e.target as HTMLElement;
		if (className == 'item') {
			style.boxShadow = '0 4px 3px gray';
		}
	}
	function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
		const { style } = e.target as HTMLElement;
		style.boxShadow = 'none';
	}
	function dragStartHandler(item: ITodo, board: Board) {
		setCurrentBoard(board);
		setCurrentTodo(item);
	}
	function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
		const { style } = e.target as HTMLElement;
		style.boxShadow = 'none';
	}
	function dropHandler(
		e: React.DragEvent<HTMLDivElement>,
		item: ITodo,
		board: Board
	) {
		e.preventDefault();
		const currentIndex = currentBoard.items.indexOf(currentTodo);

		currentBoard.items.splice(currentIndex, 1);
		const dropIndex = board.items.indexOf(item);
		currentBoard.items.splice(dropIndex + 1, 0, currentTodo);
		setBoards(
			boards.map(b => {
				if (b.id === board.id) {
					return board;
				}
				if (b.id === currentBoard.id) {
					return currentBoard;
				}
				return b;
			})
		);
	}
	function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: Board) {
		board.items.concat(currentTodo);
		console.log('currentItem', currentTodo);
		const currentIndex = currentBoard.items.indexOf(currentTodo);
		currentBoard.items.splice(currentIndex, 1);

		const newCurrentItem = { ...currentTodo, status: board.title };
		dispatch(statusUpdateThunk(newCurrentItem.id, newCurrentItem));
		setBoards(
			boards.map(b => {
				if (b.id === board.id) {
					return board;
				}
				if (b.id === currentBoard.id) {
					return currentBoard;
				}
				return b;
			})
		);
	}
	//useEffect

	useEffect(() => {
		if (filteredTasks.length > 0) {
			setBoards(prev => {
				return prev.map(el => ({
					...el,
					items: filteredTasks.filter(
						task => task.status === el.title
					)
				}));
			});
		}
	}, [todosData, dataPopup]);

	return (
		<>
			{isShow && <Popup closePopup={closePopup} dataPopup={dataPopup} />}
			<div className="card_container">
				{boards.map(board => (
					<div
						key={board.id}
						className="board"
						onDragOver={e => dragOverHandler(e)}
						onDrop={e => dropCardHandler(e, board)}
					>
						<div className="board_title">{board.title}</div>
						{board.items.map((item, index) => (
							<div
								onClick={() => onClickCard(item)}
								key={item.id}
								className="item"
								onDragOver={e => dragOverHandler(e)}
								onDragLeave={e => dragLeaveHandler(e)}
								onDragStart={() =>
									dragStartHandler(item, board)
								}
								onDragEnd={e => dragEndHandler(e)}
								onDrop={e => dropHandler(e, item, board)}
								draggable={true}
							>
								<div
									className={
										item.important ? style.imp : style.not
									}
								>
									<div
										className={
											item.completed
												? style.done
												: style.not
										}
									>
										{item.title}
									</div>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</>
	);
};
