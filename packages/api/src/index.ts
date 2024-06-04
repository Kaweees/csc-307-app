//
// Represents an item in the todo list.
//
export interface User {
	id: string;
	name: string;
	job: string;
}

export interface UsersList {
	users_list: User[];
}

export function fetchUsers(): Promise<Response> {
	const promise = fetch('http://localhost:8000/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	});
	return promise;
}

export function postUser(person: User): Promise<Response> {
	const promise = fetch('http://localhost:8000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(person),
	});
	return promise;
}

export function deleteUser(id: string): Promise<Response> {
	const promise = fetch(`http://localhost:8000/users/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	});
	return promise;
}

// //
// // Represents an item in the todo list.
// //
// export interface ITodoItem {
// 	//
// 	// The text of the todo item.
// 	//
// 	text: string;
// }

// //
// // Payload to the REST API HTTP POST /todo.
// //
// export interface IAddTodoPayload {
// 	//
// 	// The todo item to be added to the list.
// 	//
// 	todoItem: ITodoItem;
// }

// //
// // Response from the REST API GET /todos.
// //
// export interface IGetTodosResponse {
// 	//
// 	// The todo list that was retreived.
// 	//
// 	todoList: ITodoItem[];
// }

// //
// // Validates a todo item and returns an error message if there's a problem.
// //
// export function validateTodo(todoItem: ITodoItem) {
// 	if (!todoItem) {
// 		return {
// 			valid: false,
// 			message: 'Todo item has no data.',
// 		};
// 	}

// 	if (!todoItem.text) {
// 		return {
// 			valid: false,
// 			message: 'Todo item has no text.',
// 		};
// 	}

// 	return { valid: true };
// }
