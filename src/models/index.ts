export type ITodo = {
	id: string;
	project: string | undefined;
	title: string;
	description: string;
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

export type StoreState = {
	todo: List;
	jira: {
		projects: IProject[];
	};
};
