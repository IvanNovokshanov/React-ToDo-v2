export type ITodo = {
	id: string;
	project: string | undefined;
	title: string;
	completed: boolean;
	important: boolean;
	date: string;
};
export type List = {
	todos: ITodo[];
};

export type IProject = {
	id: string;
	project: string;
};
