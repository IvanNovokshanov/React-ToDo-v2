import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { HomePage } from './Pages/Home/components/HomePage';
import { AddTodo } from './Pages/TodoList/components/AddTodo';
import { TodoList } from './Pages/TodoList/components/TodoList';

export const App = () => {
	return (
		<div className="root">
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route
					path="/task/:project"
					element={
						<>
							<AddTodo />
							<TodoList />
						</>
					}
				/>
			</Routes>
		</div>
	);
};

// export const App = () => {
// 	return (
// 		<div className="root">
// 			<Routes>
// 				<Route path="/" element={<HomePage />} />

// 				<Route
// 					path="/task"
// 					element={
// 						<>
// 							<AddTodo />
// 							<TodoList />
// 						</>
// 					}
// 				/>
// 			</Routes>
// 		</div>
// 	);
// };
