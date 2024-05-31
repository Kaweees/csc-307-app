import { User } from 'api';

export const users: { users_list: User[] } = {
	users_list: [
		{
			id: 'xyz789',
			name: 'Charlie',
			job: 'Janitor',
		},
		{
			id: 'abc123',
			name: 'Mac',
			job: 'Bouncer',
		},
		{
			id: 'ppp222',
			name: 'Mac',
			job: 'Professor',
		},
		{
			id: 'yat999',
			name: 'Dee',
			job: 'Aspring actress',
		},
		{
			id: 'zap555',
			name: 'Dennis',
			job: 'Bartender',
		},
	],
};

export const findUserByName = (name: string) => {
	return users['users_list'].filter((user) => user['name'] === name);
};

export const findUserById = (id: string): User | undefined => {
	return users['users_list'].find((user) => user['id'] === id);
};

export const findUsersByNameAndJob = (name: string, job: string) => {
	return users['users_list'].filter((user) => user['name'] === name && user['job'] === job);
};

export const deleteUserById = (id: string): boolean => {
	const user = findUserById(id);
	if (user) {
		users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
		return true; // User deleted successfully
	}
	return false; // User not found
};

export const addUser = (user: User) => {
	users['users_list'].push(user);
	return user;
};
