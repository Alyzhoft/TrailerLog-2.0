import { prisma } from '../utils/prisma';

export async function getTrailers() {
	try {
		const trailers = await prisma.trailer.findMany();

		return trailers;
	} catch (error) {
		return error;
	}
}

export async function addTrailer(trailerNumber: string, carrier: string, category: string, trailerLocation: string, comments: string) {
	try {
		const trailer = await prisma.trailer.create({
			data: {
				trailerNumber,
				carrier,
				category,
				trailerLocation,
				comments,
			},
		});

		return trailer;
	} catch (error) {
		return error;
	}
}

export async function updateTrailer(trailerId: number, trailerNumber: string, carrier: string, category: string, comments: string) {
	try {
		const trailer = await prisma.trailer.update({
			where: {
				id: trailerId,
			},

			data: {
				trailerNumber,
				carrier,
				category,
				comments,
			},
		});

		return trailer;
	} catch (error) {
		return error;
	}
}

export async function deleteTrailer(trailerId: number) {
	try {
		const trailer = await prisma.trailer.delete({
			where: {
				id: trailerId,
			},
		});

		return trailer;
	} catch (error) {
		return error;
	}
}
