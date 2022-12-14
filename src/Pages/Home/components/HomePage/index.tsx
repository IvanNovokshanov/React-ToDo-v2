import React, { useEffect } from 'react';
import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsThunk } from '../../../../store/projectsSlice';
import { NavLink } from 'react-router-dom';
import { IProject } from '../../../../models';
import { getProjects, getTodos } from '../../../../selectors/jira';
import logo from '../../../../../public/images/pngegg.png';

export const HomePage = () => {
	const projectData = useSelector(getProjects);
	const todosData = useSelector(getTodos);

	const dispatch: any = useDispatch();

	useEffect(() => {
		dispatch(getProjectsThunk());
	}, []);

	return (
		<div>
			<div className={style.imgBlock}>
				<img src={logo} className={style.img} alt="" />
				<h3 className={style.title}>React ToDo v2</h3>
			</div>
			<div className={style.list_group_container}>
				<ul className="list-group">
					{projectData?.map((el: IProject) => (
						<NavLink
							to={`task/${el.project}`}
							key={el.id}
							className={style.link}
						>
							<li className="list-group-item d-flex justify-content-between  fw-bold align-items-center">
								{el.project}

								<span className="badge bg-primary rounded-pill">
									{
										todosData?.filter(
											todo => todo.project === el.project
										).length
									}
								</span>
							</li>
						</NavLink>
					))}
				</ul>
			</div>
		</div>
	);
};
