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
					<div>
						<div className={style.title_task}>
							{dataPopup?.title}
						</div>
						<div className={style.description_task}>
							{dataPopup?.description}
						</div>
					</div>
					<div className={style.task_details_box}>
						<div>
							статус:
							{dataPopup?.completed ? 'готово' : 'в работе'}
						</div>
						<div>
							приоритет:
							{dataPopup?.important
								? 'высокий приоритет'
								: 'обычный'}
						</div>
						<div>дата создания:{dataPopup?.date}</div>
						<div>в работе времени:</div>
						<div>дата завершения:</div>
					</div>
				</div>

				<img className={style.close} src={close} onClick={closePopup} />
			</div>
		</>
	);
};
