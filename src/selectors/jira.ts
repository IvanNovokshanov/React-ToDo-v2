import { createSelector } from '@reduxjs/toolkit';

export const getJiraState = state => state?.jira;

export const getProjects = createSelector(getJiraState, jira => jira?.projects);
export const getTasks = createSelector(
	getJiraState,
	jira => jira?.currentProject
);

export const getTodoState = state => state?.todo;
export const getTodos = createSelector(getTodoState, todo => todo?.todos);
