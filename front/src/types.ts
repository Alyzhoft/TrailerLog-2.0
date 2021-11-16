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

/**
 * Model Trailer
 */

export type Trailer = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	trailerNumber: string;
	carrier: string;
	category: string;
	trailerLocation: string;
	spotNumber: string;
	comments: string | number | readonly string[] | undefined;
	departed: boolean;
	Spots: Spots;
};

/**
 * Model Requests
 */

export type Requests = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	inCarrier: string | null;
	inTrailerNumber: string | null;
	completed: boolean;
	completedTime: Date | null;
	urgent: boolean;
	outTrailerLocation: string | null;
	outSpotNumber: string | null;
	inTrailerLocation: string | null;
	inSpotNumber: string | null;
	outTrailerNumber: string | null;
	outCarrier: string | null;
	special: string | null;
	outCategory: string | null;
	requestType: RequestType;
	trailerId: number | null;
	spotId: number | null;
	trailer: Trailer;
};

/**
 * Model Carrier
 */

export type Carrier = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	carrierName: string;
};

/**
 * Model Category
 */

export type Category = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	categoryName: string;
	color: string;
};

/**
 * Model Plant
 */

export type Plant = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
};

/**
 * Model View
 */

export type View = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	plantId: number;
	dockId: number | null;
	lotId: number | null;
};

/**
 * Model Dock
 */

export type Dock = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
};

/**
 * Model Lot
 */

export type Lot = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
};

/**
 * Model Spots
 */

export type Spots = {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	trailerId: number | null;
	dockId: number | null;
	lotId: number | null;
};

// export interface trailer {
// 	id: number;
// 	createdAt: string;
// 	trailerNumber: string;
// 	carrier: string;
// 	category: string;
// 	trailerLocation: TrailerLocation;
// 	spotNumber: string;
// 	comments: string;
// }

// export type Request = {
// 	id: number;
// 	spotId: number | null;
// 	createdAt: Date;
// 	updatedAt: Date;
// 	inCarrier: string | null;
// 	inTrailerNumber: string | null;
// 	completed: boolean;
// 	completedTime: Date | null;
// 	urgent: boolean;
// 	outTrailerLocation: TrailerLocation | null;
// 	outSpotNumber: string | null;
// 	inTrailerLocation: TrailerLocation | null;
// 	inSpotNumber: string | null;
// 	outTrailerNumber: string | null;
// 	outCarrier: string | null;
// 	special: string | null;
// 	outCategory: string | null;
// 	requestType: RequestType;
// 	trailerId: number;
// 	trailer: trailer;
// };

// export interface Spots {
// 	id: number;
// 	createdAt: Date;
// 	updatedAt: Date;
// 	name: string;
// 	trailerId: number | null;
// 	dockId: number | null;
// 	lotId: number | null;
// }

export type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element;
