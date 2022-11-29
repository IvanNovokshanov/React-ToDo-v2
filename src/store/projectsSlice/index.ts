import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getProjectsFetch } from '../../api';
import { IProject } from '../../models';

import { AppDispatch } from '../store';

const initialState: { projects: IProject[] } = {
	projects: []
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProjects: (state, action) => ({
			...state,
			projects: action.payload
		})
	}
});

export const getProjectsThunk = () => async (dispatch: AppDispatch) => {
	const response = await getProjectsFetch();
	dispatch(addProjects(response));
};
export const { addProjects } = projectsSlice.actions;

export const projectSliceReducer = projectsSlice.reducer;
