import { Button } from '@components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { type User } from 'api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
	name: z.string().min(1, {
		message: 'Name cannot be empty.',
	}),
	job: z.string().min(1, {
		message: 'Job cannot be empty.',
	}),
});

interface InputFormProps {
	addEmployee: (employee: User) => void;
}

export default function InputForm(props: InputFormProps): JSX.Element {
	const [person] = useState({
		name: '',
		job: '',
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			job: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const employee: User = {
			id: '', // Add the missing 'id' property
			name: data.name,
			job: data.job,
		};
		props.addEmployee(employee);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="First Last" {...field} />
							</FormControl>
							<FormDescription>This is your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="job"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Job</FormLabel>
							<FormControl>
								<Input placeholder="Job title" {...field} />
							</FormControl>
							<FormDescription>This is your job title.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
