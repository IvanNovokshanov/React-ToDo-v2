import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from '../models';

export const getJiraState = (store: StoreState) => store?.jira;

export const getProjects = createSelector(getJiraState, jira => jira?.projects);

export const getTodoState = (store: StoreState) => store?.todo;
export const getTodos = createSelector(getTodoState, todo => todo.todos);

export const getImportant = (id: string, store: StoreState) =>
	createSelector(
		getTodos,
		todos => todos.find(el => el.id === id)!.important
	)(store);

export const getCompleted = (id: string, store: StoreState) =>
	createSelector(
		getTodos,
		todos => todos.find(el => el.id === id)!.completed
	)(store);
