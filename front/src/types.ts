export enum TrailerLocation {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
	RVAC = 'RVAC',
	RMAN = 'RMAN',
}

export interface trailer {
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: TrailerLocation;
	spotNumber: string;
	comments: string;
}
