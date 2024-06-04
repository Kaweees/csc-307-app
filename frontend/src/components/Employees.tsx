import AddEmployeeForm from '@components/AddEmployeeForm';
import TableDemo from '@components/TableDemo';
import { Button } from '@components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@components/ui/drawer';
import { ScrollArea } from '@components/ui/scroll-area';
import { Toaster } from '@components/ui/toaster';
import { useToast } from '@components/ui/use-toast';
import { type User, type UsersList, deleteUser, fetchUsers, postUser } from 'api';
import { useEffect, useState } from 'react';

export default function Employees(): JSX.Element {
	const [showSheet, setShowSheet] = useState(false);

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
			<div className="flex h-full flex-1 flex-col space-y-8 p-8">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
						<p className="text-muted-foreground">Here&apos;s a list of your employees!</p>
					</div>
					<div className="flex items-center space-x-2">
						<Drawer open={showSheet} onOpenChange={setShowSheet}>
							<DrawerTrigger asChild>
								<Button>Add person</Button>
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle className="px-4">Add person</DrawerTitle>
								</DrawerHeader>
								<ScrollArea className="overflow-y-auto ">
									<AddEmployeeForm addEmployee={addEmployee} />
								</ScrollArea>
							</DrawerContent>
						</Drawer>
					</div>
				</div>
				<TableDemo employees={employees} removeEmployee={removeEmployee} />
			</div>
			<Toaster />
		</>
	);
}
