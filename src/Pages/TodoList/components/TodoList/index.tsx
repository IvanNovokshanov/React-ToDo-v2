import React, { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import { ITodo, List, Board } from '../../../../models';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../../../selectors/jira';
import { Popup } from '../Popup';
import { statusUpdateThunk } from '../../../../store/todoSlice';
import {
	toggleThunk,
	importantThunk,
	deleteThunk
} from '../../../../store/todoSlice';

export const TodoList = () => {
	//State
	const dispatch: any = useDispatch();
	const { project } = useParams();
	const [isShow, setIsShow] = useState(false);
	const [dataPopup, setDataPopup] = useState<ITodo>();

	const todosData = useSelector(getTodos);
	const filteredTasks = todosData.filter(
		(el: ITodo) => el.project === project
	);

	// Popup

	const onClickCard = (task: ITodo) => {
		setIsShow(true);
		setDataPopup(task);
	};
	const closePopup = () => {
		setIsShow(false);
	};

	// Board

	const boardInitialState = [
		{ id: 1, title: 'Queue', items: [] },
		{ id: 2, title: 'Development', items: [] },
		{ id: 3, title: 'Done', items: [] }
	];

	const [boards, setBoards] = useState(boardInitialState);

	const [currentBoard, setCurrentBoard] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);
	function dragOverHandler(e) {
		e.preventDefault();
		if (e.target.className == 'item') {
			e.target.style.boxShadow = '0 4px 3px gray';
		}
	}
	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none';
	}
	function dragStartHandler(e, item, board) {
		setCurrentBoard(board);
		setCurrentItem(item);
	}
	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none';
	}
	function dropHandler(e, item, board) {
		e.preventDefault();
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);
		const dropIndex = board.items.indexOf(item);
		currentBoard.items.splice(dropIndex + 1, 0, currentItem);
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
	function dropCardHandler(e, board) {
		board.items.concat(currentItem);
		const currentIndex = currentBoard.items.indexOf(currentItem);
		currentBoard.items.splice(currentIndex, 1);

		const newCurrentItem = { ...currentItem, status: board.title };
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
	}, [todosData]);

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
								onDragStart={e =>
									dragStartHandler(e, item, board)
								}
								onDragEnd={e => dragEndHandler(e)}
								onDrop={e => dropHandler(e, item, board)}
								draggable={true}
							>
								{item.title}
							</div>
						))}
					</div>
				))}
			</div>
		</>
	);
};

{
	/* <>
			{isShow && <Popup closePopup={closePopup} dataPopup={dataPopup} />}
			<div className={style.hero}>
				<div className={style.wrapper}>
					<ul className={style.list}>
						<li className={style.list_caption}>Queue</li>
						<li className={style.list_caption}>Development</li>
						<li className={style.list_caption}>Done</li>
						<li className={style.list_cell}></li>
					</ul>
				</div>
				{filteredTasks?.map((task: ITodo) => (
					<Todo task={task} onClickCard={onClickCard} key={task.id} />
				))}
			</div>
		</> */
}

// export const TodoList = () => {
// 	const dragAndDrop = () => {
// 		const card = document.querySelector('.js-card');
// 		const cells = document.querySelectorAll('.js-cell');
// 		console.log('cells', cells);

// 		const dragStart = function () {
// 			setTimeout(() => {
// 				this.classList.add('hide');
// 			}, 0);
// 		};
// 		const dragEnd = function () {
// 			this.classList.remove('hide');
// 		};
// 		const dragOver = function (event) {
// 			event.preventDefault();
// 		};
// 		const dragEnter = function (event) {
// 			event.preventDefault();
// 			this.classList.add('hovered');
// 		};
// 		const dragLeave = function () {
// 			this.classList.remove('hovered');
// 		};
// 		const dragDrop = function () {
// 			this.append(card);
// 		};
// 		cells.forEach(cell => {
// 			cell.addEventListener('dragover', dragOver);
// 			cell.addEventListener('dragenter', dragEnter);
// 			cell.addEventListener('dragleave', dragLeave);
// 			cell.addEventListener('drop', dragDrop);
// 		});
// 		card?.addEventListener('dragstart', dragStart);
// 		card?.addEventListener('dragend', dragEnd);
// 	};
// 	dragAndDrop();
// 	const [isShow, setIsShow] = useState(false);
// 	const [dataPopup, setDataPopup] = useState<ITodo>();

// 	const dispatch: any = useDispatch();
// 	const todosData = useSelector(getTodos);
// 	const { project } = useParams();

// 	const filteredTasks = todosData.filter(
// 		(el: ITodo) => el.project === project
// 	);

// 	const onClickCard = (task: ITodo) => {
// 		console.log('TODO', task);

// 		setIsShow(true);
// 		setDataPopup(task);
// 	};
// 	const closePopup = () => {
// 		setIsShow(false);
// 	};

// 	useEffect(() => {
// 		dispatch(getTodosThunk());
// 	}, []);

// 	return (
// 		<>
// 			{isShow && <Popup closePopup={closePopup} dataPopup={dataPopup} />}
// 			<div className="hero">
// 				<div className="wrapper">
// 					<ul className="list">
// 						<li className="list_caption">Queue</li>
// 						<li className="list_caption">Development</li>
// 						<li className="list_caption">Done</li>
// 						<li className="list_cell js-cell">
// 							<div className="list_card js-card" draggable="true">
// 								<div className="list_card_header">
// 									task title
// 								</div>
// 								<div className="list_card_info">
// 									task discriprion
// 								</div>
// 							</div>
// 						</li>
// 						<li className="list_cell js-cell"></li>
// 						<li className="list_cell js-cell"></li>
// 					</ul>
// 				</div>
// 			</div>
// 			{filteredTasks?.map((task: ITodo) => (
// 				<Todo task={task} onClickCard={onClickCard} key={task.id} />
// 			))}
// 		</>
// 	);
// };

// export const TodoList = () => {
// 	const { project } = useParams();
// 	const [isShow, setIsShow] = useState(false);
// 	const [dataPopup, setDataPopup] = useState<ITodo>();

// 	const dispatch: any = useDispatch();
// 	const todosData = useSelector(getTodos);

// 	const filteredTasks = todosData.filter(
// 		(el: ITodo) => el.project === project
// 	);

// 	const onClickCard = (task: ITodo) => {
// 		setIsShow(true);
// 		setDataPopup(task);
// 	};
// 	const closePopup = () => {
// 		setIsShow(false);
// 	};

// 	const [cardList, setCardList] = useState(filteredTasks);
// 	const [currentCard, setCurrentCard] = useState(null);
// 	console.log('filteredTasks', filteredTasks);
// 	console.log('cardList', cardList);

// 	function dragStartHandler(e, card) {
// 		console.log('drag', card);
// 		setCurrentCard(card);
// 	}
// 	function dragLeaveHandler(e) {}
// 	function dragEndHandler(e) {
// 		e.target.style.background = 'white';
// 	}
// 	function dragOverHandler(e) {
// 		e.preventDefault();
// 		e.target.style.background = 'lightgray';
// 	}
// 	function dropHandler(e, card) {
// 		e.preventDefault();
// 		setCardList(
// 			cardList.map(el => {
// 				if (el.id === card.id) {
// 					return { ...el, order: currentCard.order };
// 				}
// 				if (el.id === currentCard.id) {
// 					return { ...el, order: card.order };
// 				}
// 				return el;
// 			})
// 		);
// 		e.target.style.background = 'white';
// 		console.log('drop', card);
// 	}

// 	const sortCards = (a, b) => {
// 		if (a.order > b.order) {
// 			return 1;
// 		} else {
// 			return -1;
// 		}
// 	};
// 	useEffect(() => {
// 		dispatch(getTodosThunk());
// 	}, []);

// 	return (
// 		<>
// 			{isShow && <Popup closePopup={closePopup} dataPopup={dataPopup} />}
// 			<div className="card_container">
// 				{cardList.sort(sortCards).map(card => (
// 					<div
// 						className="card"
// 						key={card.id}
// 						onClick={() => onClickCard(card)}
// 						onDragStart={e => dragStartHandler(e, card)}
// 						onDragLeave={e => dragEndHandler(e)}
// 						onDragEnd={e => dragEndHandler(e)}
// 						onDragOver={e => dragOverHandler(e)}
// 						onDrop={e => dropHandler(e, card)}
// 						draggable={true}
// 					>
// 						{card.title}
// 					</div>
// 				))}
// 			</div>
// 		</>
// 	);
// };
