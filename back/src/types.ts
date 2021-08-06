import { TrailerLocation } from "@prisma/client";
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

export interface search {
  carrier: string;
  category: string;
  trailerLocation: string;
  trailerNumber: string;
  departed: boolean;
  page: number;
  limit: number;
}

// Addes data to request
// interface IUserRequest extends Request {
// 	user: any;
// }
