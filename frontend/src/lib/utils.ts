import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getBaseRoute(pathname: string) {
	const pathSegments = pathname.split('/').filter((segment: string) => segment !== '');
	return pathSegments.length > 0 ? pathSegments[0] : '';
}
