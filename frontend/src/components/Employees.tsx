import InputForm from '@components/InputForm';
import TableDemo from '@components/TableDemo';
import { Toaster } from '@components/ui/toaster';
import { useToast } from '@components/ui/use-toast';
import { deleteUser, fetchUsers, postUser } from 'api';
import { useEffect, useState } from 'react';

export default function Employees(): JSX.Element {
	const { toast } = useToast();

	const [employees, setEmployees] = useState([]);

	function addEmployee(employee: { name: string; job: string; id: string }): void {
		postUser(employee)
			.then(() => setEmployees([...employees, employee]))
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
		const updated = employees.filter((_employee, i) => {
			return i !== index;
		});
		setEmployees(updated);
		console.log(employees[index]);
		deleteUser(employees[index].id);
		toast({
			title: 'Removed employee',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(employees[index], null, 2)}</code>
				</pre>
			),
		});
	}

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
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
