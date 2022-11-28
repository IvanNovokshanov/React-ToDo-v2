import React, { FC } from 'react';
import style from './style.module.css';
import close from '../../../../../public/images/close.svg';
import { ITodo } from '../../../../models';

interface IPopupProps {
	closePopup: () => void;
	dataPopup: ITodo | undefined;
}

export const Popup: FC<IPopupProps> = ({ closePopup, dataPopup }) => {
	console.log('dataPopup', dataPopup);

	return (
		<>
			<div className={style.blur}></div>
			<div className={style.popup}>
				<div className={style.popup_container}>
					<div>{dataPopup?.title}</div>
					<div>{dataPopup?.description}</div>
				</div>

				<img className={style.close} src={close} onClick={closePopup} />
			</div>
		</>
	);
};
