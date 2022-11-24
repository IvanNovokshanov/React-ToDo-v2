export type ITodo = {
	id: string;
	title: string;
	completed: boolean;
	important: boolean;
	date: string;
};
export type List = {
	todos: ITodo[];
};
