import InputForm from '@components/InputForm';
import TableDemo from '@components/TableDemo';
import { Toaster } from '@components/ui/toaster';
import { useToast } from '@components/ui/use-toast';
import { type User, type UsersList, deleteUser, fetchUsers, postUser } from 'api';
import { useEffect, useState } from 'react';

export default function Employees(): JSX.Element {
	const { toast } = useToast();

	const [employees, setEmployees] = useState<User[]>([]);

	function addEmployee(employee: User): void {
		postUser(employee)
			.then((res) => res.json() as Promise<User>)
			.then((json) => setEmployees([...employees, json]))
			.catch((error) => {
				console.log(error);
			});
		toast({
			title: 'Added employee',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(employee, null, 2)}</code>
				</pre>
			),
		});
	}

	function removeEmployee(index: number): void {
		deleteUser(employees[index].id)
			.then((res) => {
				if (res.status === 204) {
					const newEmployees = employees.filter((_employees, i) => i !== index);
					setEmployees(newEmployees);
					toast({
						title: 'Removed employee',
						description: (
							<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
								<code className="text-white">{JSON.stringify(employees[index], null, 2)}</code>
							</pre>
						),
					});
				} else {
					console.log('Delete failed');
				}
			})
			.catch((error) => console.log(error));
	}

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json() as Promise<UsersList>)
			.then((json) => setEmployees(json['users_list']))
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Toaster />
			<TableDemo employees={employees} removeEmployee={removeEmployee} />
			<InputForm addEmployee={addEmployee} />
		</>
	);
}
