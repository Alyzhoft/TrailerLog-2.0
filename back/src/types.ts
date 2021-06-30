import { TrailerLocation } from '@prisma/client';

export interface trailer {
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: TrailerLocation;
	spotNumber: string;
	comments: string;
}

export type postData = {
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: TrailerLocation;
	spotNumber: string;
	comments: string;
};

export type deleteData = {
	trailerId: number;
};

export type putData = {
	trailerId: number;
	trailerNumber: string;
	carrier: string;
	category: string;
	comments: string;
};

// Addes data to request
// interface IUserRequest extends Request {
// 	user: any;
// }
