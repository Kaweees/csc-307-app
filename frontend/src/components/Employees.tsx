import { InputForm } from '@components/InputForm';
import TableDemo from '@components/TableDemo';
import { useState } from 'react';

interface EmployeesProps {}

export default function Employees(props: EmployeesProps): JSX.Element {
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
		const updated = employees.filter((employee, i) => {
			return i !== index;
		});
		setEmployees(updated);
	}

	return (
		<>
			<TableDemo employees={employees} removeEmployee={removeEmployee} />
			<InputForm />
		</>
	);
}
