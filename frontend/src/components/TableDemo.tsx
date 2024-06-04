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
					{props.employees.map((invoice, index) => (
						<TableRow key={invoice.id}>
							<TableCell className="font-medium">{invoice.name}</TableCell>
							<TableCell className="text-right">{invoice.job}</TableCell>
							<TableCell className="text-right">{invoice.id}</TableCell>
							<TableCell className="text-right">
								<Button onClick={() => props.removeEmployee(index)}>Remove</Button>
							</TableCell>
						</TableRow>
					))}
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
