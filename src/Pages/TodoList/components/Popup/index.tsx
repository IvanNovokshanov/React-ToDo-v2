import React, { FC, useState } from 'react';
import style from './style.module.css';
import close from '../../../../../public/images/close.svg';
import { ITodo, StoreState } from '../../../../models';
import { dateConvertor } from '../../../../dateConvertor';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleThunk,
	importantThunk,
	deleteThunk,
	titleUpdateThunk
} from '../../../../store/todoSlice';
import { descriptionUpdateThunk } from '../../../../store/todoSlice';
import { getCompleted, getImportant } from '../../../../selectors/jira';

interface IPopupProps {
	closePopup: () => void;
	dataPopup: ITodo;
}

export const Popup: FC<IPopupProps> = ({ closePopup, dataPopup }) => {
	const date = dateConvertor(dataPopup.date);
	const important = useSelector((state: StoreState) =>
		getImportant(dataPopup.id, state)
	);
	const completed = useSelector((state: StoreState) =>
		getCompleted(dataPopup.id, state)
	);

	const dispatch: any = useDispatch();
	const toggleTodoButton = (id: string) => {
		dispatch(toggleThunk(id, dataPopup));
	};
	const importantTodoButton = (id: string) => {
		dispatch(importantThunk(id, dataPopup));
	};
	const deleteTodoButton = (id: string) => {
		dispatch(deleteThunk(id));
	};
	const [titleValue, setTitleValue] = useState(dataPopup.title);
	const [descriptionValue, setDescriptionValue] = useState(
		dataPopup.description
	);
	const [isEditTitle, setIsEditTitle] = useState(false);
	const [isEditDescription, setIsEditDescription] = useState(false);

	let elemTitle;
	if (!isEditTitle) {
		elemTitle = (
			<span onClick={() => setIsEditTitle(true)}>{titleValue}</span>
		);
	} else {
		elemTitle = (
			<input
				value={titleValue}
				className={style.input_task}
				onChange={event => setTitleValue(event.target.value)}
				onBlur={() => {
					setIsEditTitle(false);
					dispatch(
						titleUpdateThunk(dataPopup.id, dataPopup, titleValue)
					);
				}}
			/>
		);
	}

	let elemDescription;
	if (!isEditDescription) {
		elemDescription = (
			<span
				className={style.description_task}
				onClick={() => setIsEditDescription(true)}
			>
				{descriptionValue}
			</span>
		);
	} else {
		elemDescription = (
			<textarea
				value={descriptionValue}
				className={style.input_task}
				rows={3}
				onChange={event => setDescriptionValue(event.target.value)}
				onBlur={() => {
					setIsEditDescription(false);
					dispatch(
						descriptionUpdateThunk(
							dataPopup.id,
							dataPopup,
							descriptionValue
						)
					);
				}}
			/>
		);
	}

	return (
		<>
			<div className={style.blur}></div>
			<div className={style.popup}>
				<div className={style.popup_container}>
					<div className={style.popup_text}>
						<div className={style.title_task}>
							<p>{elemTitle}</p>
						</div>
						<div className={style.description_task}>
							<p>{elemDescription}</p>
						</div>
					</div>
					<div className={style.button_group}>
						<div
							className="btn-group"
							role="group"
							aria-label="Default button group"
						>
							<button
								type="button"
								className="btn btn-outline-dark"
								onClick={() =>
									importantTodoButton(dataPopup.id)
								}
							>
								???????????????? ??????????????????
							</button>
							<button
								type="button"
								className="btn btn-outline-dark"
								onClick={() => toggleTodoButton(dataPopup.id)}
							>
								???????????????? ????????????
							</button>
							<button
								type="button"
								className="btn btn-outline-dark"
								onClick={() => {
									deleteTodoButton(dataPopup.id);

									closePopup();
								}}
							>
								?????????????? ????????????
							</button>
						</div>
					</div>
					<div className={style.task_details_box}>
						<ul className={style.task_request_block}>
							<li>????????????:</li>
							<li>??????????????????:</li>
							<li>???????? ????????????????:</li>
							<li>?? ???????????? ??????????????:</li>
						</ul>
						<ul className={style.task_response_block}>
							<li>{completed ? '????????????' : '?? ????????????'}</li>
							<li>
								{important ? (
									<span className={style.priority}>
										?????????????? ??????????????????
									</span>
								) : (
									<span className={style.not_priority}>
										??????????????
									</span>
								)}
							</li>
							<li>{dataPopup?.date.toString()}</li>
							<li>{`${date[0]} ?????? ${date[1]} ???????? ${date[2]} ????????????`}</li>
						</ul>
					</div>
				</div>

				<img className={style.close} src={close} onClick={closePopup} />
			</div>
		</>
	);
};
