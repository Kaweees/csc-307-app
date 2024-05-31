// import { IAddTodoPayload, IGetTodosResponse, ITodoItem, validateTodo } from 'validation';
import { User } from 'api';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import {
	addUser,
	deleteUserById,
	findUserById,
	findUserByName,
	findUsersByNameAndJob,
	users,
} from './users';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

//
// Enables JSON in the request body.
//
app.use(bodyParser.json());

//
// Enables cross origin resource sharing so the frontend can us this REST API.
//
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.get('/users', (req: Request, res: Response) => {
	const name: string = req.query.name as string;
	if (!name) {
		res.send(users);
		return;
	} else {
		res.send({ users_list: findUserByName(name) });
	}
});

app.get('/users/search', (req: Request, res: Response) => {
	const name: string = req.query.name as string;
	const job: string = req.query.job as string;
	if (name && job) {
		const result = findUsersByNameAndJob(name, job);
		res.send({ users_list: result });
	} else {
		res.status(400).send('Name and job parameters are required.');
	}
});

app.post('/users', (req: Request, res: Response) => {
	console.log('POST ', req.body);
	const userToAdd = req.body as User;
	addUser(userToAdd);
	res.send();
});

app.get('/users/:id', (req: Request, res: Response) => {
	const id = req.params['id']; //or req.params.id
	let result = findUserById(id);
	if (result === undefined) {
		res.status(404).send('Resource not found.');
	} else {
		res.send(result);
	}
});

app.delete('/users/:id', (req: Request, res: Response) => {
	const id = req.params['id']; //or req.params.id
	const deleted = deleteUserById(id);
	if (deleted) {
		res.status(200).send('User deleted successfully.');
	} else {
		res.status(404).send('User not found.');
	}
});

app.listen(port, () => {
	console.log(`[server]: Server is listening at http://localhost:${port}`);
});
