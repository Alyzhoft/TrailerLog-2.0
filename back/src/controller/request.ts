import { Prisma, Requests, RequestType } from '@prisma/client';
import { prisma } from '../utils/prisma';

export async function getRequests() {
	try {
		const requests = await prisma.requests.findMany({
			where: {
				completed: false,
			},
		});

		return requests;
	} catch (error) {
		return error;
	}
}

export async function addRequest(requests: Requests) {
	try {
		let outRequest;
		let inRequest;

		if ('outTrailerNumber' in requests) {
			outRequest = await prisma.requests.create({
				data: {
					trailerId: requests.trailerId,
					outSpotNumber: requests.outSpotNumber,
					outTrailerLocation: requests.outTrailerLocation,
					outTrailerNumber: requests.outTrailerNumber,
					outCarrier: requests.outCarrier,
					special: requests.special,
					outCategory: requests.outCategory,
					requestType: RequestType.OUT,
				},
			});
		}

		if ('inTrailerNumber' in requests) {
			inRequest = await prisma.requests.create({
				data: {
					trailerId: requests.trailerId,
					inCarrier: requests.inCarrier,
					inTrailerNumber: requests.inTrailerNumber,
					inSpotNumber: requests.inSpotNumber,
					inTrailerLocation: requests.inTrailerLocation,
					special: requests.special,
					requestType: RequestType.IN,
				},
			});
		}

		return { outRequest, inRequest };
	} catch (e) {
		return e;
	}
}

// export async function updateTrailer(trailer: Trailer) {
// 	try {
// 		const res = await prisma.trailer.update({
// 			where: {
// 				id: trailer.id,
// 			},

// 			data: {
// 				trailerNumber: trailer.trailerNumber.toString(),
// 				carrier: trailer.carrier,
// 				category: trailer.category,
// 				comments: trailer.comments,
// 			},
// 		});

// 		return res;
// 	} catch (error) {
// 		return error;
// 	}
// }

export async function deleteRequest(id: number) {
	try {
		const trailer = await prisma.requests.delete({
			where: {
				id,
			},
		});

		return trailer;
	} catch (error) {
		return error;
	}
}

export async function completed(request: Requests) {
	try {
		const res = await prisma.requests.update({
			where: {
				id: request.id,
			},
			data: {
				completed: true,
			},
		});

		let trailer;
		if (request.inTrailerLocation !== null && request.inSpotNumber !== null) {
			trailer = await prisma.trailer.update({
				where: { id: request.trailerId },
				data: {
					trailerLocation: request?.inTrailerLocation,
					spotNumber: request?.inSpotNumber,
				},
			});
		}

		return { res, trailer };
	} catch (e) {
		return e;
	}
}
