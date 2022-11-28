import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from '../models';

export const getJiraState = (store: StoreState) => store?.jira;

export const getProjects = createSelector(getJiraState, jira => jira?.projects);

export const getTodoState = (store: StoreState) => store?.todo;
export const getTodos = createSelector(getTodoState, todo => todo?.todos);
