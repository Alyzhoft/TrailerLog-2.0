import { TrailerLocation } from '@prisma/client';

interface trailer {
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: TrailerLocation;
	spotNumber: string;
	comments: string;
}

type postData = {
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: TrailerLocation;
	spotNumber: string;
	comments: string;
};

type deleteData = {
	trailerId: number;
};

type putData = {
	trailerId: number;
	trailerNumber: string;
	carrier: string;
	category: string;
	comments: string;
};

interface IUserRequest extends Request {
	user: any;
}
