export enum TrailerLocation {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
	RVAC = 'RVAC',
	RMAN = 'RMAN',
}

export enum RequestType {
	IN = 'IN',
	OUT = 'OUT',
}

export interface trailer {
	id: number;
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: TrailerLocation;
	spotNumber: string;
	comments: string;
}

export type Request = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	inCarrier: string | null;
	inTrailerNumber: string | null;
	completed: boolean;
	completedTime: Date | null;
	urgent: boolean;
	outTrailerLocation: TrailerLocation | null;
	outSpotNumber: string | null;
	inTrailerLocation: TrailerLocation | null;
	inSpotNumber: string | null;
	outTrailerNumber: string | null;
	outCarrier: string | null;
	special: string | null;
	outCategory: string | null;
	requestType: RequestType;
	trailerId: number;
};
