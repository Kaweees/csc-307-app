import { type ClassValue, clsx } from 'clsx';
// import dotenv from 'dotenv';
import { twMerge } from 'tailwind-merge';

// dotenv.config();

// export function getEnvironmentVariable(environmentVariable: string): string {
// 	const validEnvironmentVariable = process.env[environmentVariable];
// 	if (!validEnvironmentVariable) {
// 		throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
// 	}
// 	return validEnvironmentVariable;
// }

// export const ENV = {
// 	// FIREBASE_API_KEY: getEnvironmentVariable('NEXT_PUBLIC_FIREBASE_API_KEY'),
// 	// FIREBASE_AUTH_DOMAIN: getEnvironmentVariable('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
// FIREBASE_DATABASE_URL: getEnvironmentVariable('FIREBASE_DATABASE_URL'),
// FIREBASE_PROJECT_ID: getEnvironmentVariable('FIREBASE_PROJECT_ID'),
// FIREBASE_STORAGE_BUCKET: getEnvironmentVariable('FIREBASE_STORAGE_BUCKET'),
// FIREBASE_MESSAGING_SENDER_ID: getEnvironmentVariable('FIREBASE_MESSAGING_SENDER_ID'),
// FIREBASE_APP_ID: getEnvironmentVariable('FIREBASE_APP_ID'),
// FIREBASE_MEASUREMENT_ID: getEnvironmentVariable('FIREBASE_MEASUREMENT_ID'),
// };

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getBaseRoute(pathname: string) {
	const pathSegments = pathname.split('/').filter((segment: string) => segment !== '');
	return pathSegments.length > 0 ? pathSegments[0] : '';
}
