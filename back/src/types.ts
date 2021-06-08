// User Types
type loginData = {
	email: string;
	password: string;
};

type signupData = {
	email: string;
	password: string;
	name?: string;
};

// Meds Types
type getData = {
	id: number;
};

type postData = {
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: string;
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
