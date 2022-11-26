import { ITodo } from '../models';
export const getTodosFetch = async () => {
	const response = await fetch('http://localhost:3000/posts');
	return await response.json();
};
export const getProjectsFetch = async () => {
	const response = await fetch('http://localhost:3000/projects');
	return await response.json();
};

export const postTodoFetch = async (todo: ITodo) => {
	const response = await fetch('http://localhost:3000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(todo)
	});
	return await response.json();
};

export const deleteTodoFetch = async (id: string) => {
	const response = await fetch(`http://localhost:3000/posts/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	});
	return await response.json();
};

export const completeTodoFetch = async (id: string, todo: ITodo) => {
	const response = await fetch(`http://localhost:3000/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify(todo),

		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	});
	return await response.json();
};

export const importantTodoFetch = async (id: string, todo: ITodo) => {
	const response = await fetch(`http://localhost:3000/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify(todo),

		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	});
	return await response.json();
};
