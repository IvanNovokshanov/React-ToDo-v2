import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsThunk } from '../../../../store/projectsSlice';
import { NavLink } from 'react-router-dom';
import { IProject } from '../../../../models';
import { getProjects } from '../../../../selectors/jira';

// interface IProject {
// 	id: string;
// 	project: string;
// }

export const HomePage = () => {
	const projectData = useSelector(getProjects);
	// console.log('PROJECT', projectData);

	const dispatch: any = useDispatch();

	useEffect(() => {
		dispatch(getProjectsThunk());
	}, []);

	return (
		<div>
			<h1> Проекты:</h1>
			<ul>
				{projectData?.map((el: IProject) => (
					<NavLink to={`task/${el.project}`} key={el.id}>
						<li>{el.project}</li>
					</NavLink>
				))}
			</ul>
		</div>
	);
};
