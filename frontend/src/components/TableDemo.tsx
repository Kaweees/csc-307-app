import { Button } from '@components/ui/button';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@components/ui/table';
import { type User } from 'api';
import { Trash2 } from 'lucide-react';

interface TableDemoProps {
	employees: User[];
	removeEmployee: (index: number) => void;
}

export default function TableDemo(props: TableDemoProps): JSX.Element {
	return (
		<>
			<Table>
				<TableCaption>A list of your employees.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Name</TableHead>
						<TableHead className="text-right w-[100px]">Role</TableHead>
						<TableHead className="text-right w-[100px]">Employee ID</TableHead>
						<TableHead className="text-right w-[100px]"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.employees.length > 0 ? (
						props.employees.map(
							(employee, index) =>
								(
									<TableRow key={employee.id}>
										<TableCell className="font-medium text-left py-5">{employee.name}</TableCell>
										<TableCell className="text-right py-5">{employee.job}</TableCell>
										<TableCell className="text-right py-5">{employee.id}</TableCell>
										<TableCell className="text-right">
											<Button
												variant="destructive"
												size="icon"
												onClick={() => props.removeEmployee(index)}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								) as JSX.Element,
						)
					) : (
						<>
							<TableRow>
								<TableCell colSpan={4} className="text-center py-5">
									No employees found
								</TableCell>
							</TableRow>
						</>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell colSpan={3} className="text-right">
							{props.employees.length} people
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
}
