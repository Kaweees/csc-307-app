import InputForm from '@components/InputForm';
import TableDemo from '@components/TableDemo';
import { Toaster } from '@components/ui/toaster';
import { useToast } from '@components/ui/use-toast';
import { useState } from 'react';

export default function Employees(): JSX.Element {
	const { toast } = useToast();

	const [employees, setEmployees] = useState([
		{
			name: 'Charlie',
			job: 'Janitor',
		},
		{
			name: 'Mac',
			job: 'Bouncer',
		},
		{
			name: 'Dee',
			job: 'Aspiring actress',
		},
		{
			name: 'Dennis',
			job: 'Bartender',
		},
	]);

	function removeEmployee(index: number): void {
		const updated = employees.filter((_employee, i) => {
			return i !== index;
		});
		setEmployees(updated);
		toast({
			title: 'Removed employee',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(employees[index], null, 2)}</code>
				</pre>
			),
		});
	}

	function addEmployee(employee: { name: string; job: string }): void {
		setEmployees([...employees, employee]);
		toast({
			title: 'Added employee',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(employee, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<>
			<Toaster />
			<TableDemo employees={employees} removeEmployee={removeEmployee} />
			<InputForm addEmployee={addEmployee} />
		</>
	);
}
