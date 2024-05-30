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
import { useState } from 'react';

interface TableDemoProps {
	employees: { name: string; job: string }[];
	removeEmployee: (index: number) => void;
}

export default function TableDemo(props: TableDemoProps): JSX.Element {
	return (
		<>
			<Table>
				<TableCaption>A list of your recent people.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Name</TableHead>
						<TableHead className="text-right">Job</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{props.employees.map((invoice, index) => (
						<TableRow key={invoice.name}>
							<TableCell className="font-medium">{invoice.name}</TableCell>
							<TableCell className="text-right">{invoice.job}</TableCell>
							<TableCell className="text-right">
								<Button onClick={() => props.removeEmployee(index)}>Remove</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell colSpan={2} className="text-right">
							{props.employees.length} people
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
}
