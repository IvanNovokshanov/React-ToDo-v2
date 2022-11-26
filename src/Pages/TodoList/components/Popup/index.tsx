import React, { FC } from 'react';
import style from './style.module.css';

export const Popup = ({ closePopup }) => {
	return (
		<>
			<div className={style.blur}></div>
			<div className={style.popup}>
				POPUP
				<div className={style.close} onClick={closePopup}>
					<img src="../../../../../public/images/close.svg" />
				</div>
			</div>
		</>
	);
};
