'use client';

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
import { toast } from '@components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
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

export function InputForm() {
	const [person, setPerson] = useState({
		name: '',
		job: '',
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.target;
		if (name === 'job') setPerson({ name: person['name'], job: value });
		else setPerson({ name: value, job: person['job'] });
	}

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			job: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log('data', data);
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	// const handleChange = (e) => {
	//   setFormData({
	//     ...formData,
	//     [e.target.name]: e.target.value,
	//   });
	// };
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent the default form submission behavior
		// Handle form submission logic here, e.g., send form data to an API
		console.log('Form submitted:', person);
	};

	return (
		<Form {...form}>
			<form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
