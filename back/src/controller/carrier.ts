import { prisma } from '../utils/prisma';

export async function getCarriers() {
	try {
		const carriers = await prisma.carrier.findMany();

		return carriers;
	} catch (error) {
		return error;
	}
}

export async function addCarrier(carrierName: string) {
	try {
		const res = await prisma.carrier.create({
			data: {
				carrierName,
			},
		});

		return res;
	} catch (error) {
		return error;
	}
}

export async function updateCarrier(id: number, carrierName: string) {
	try {
		const res = await prisma.carrier.update({
			where: {
				id,
			},

			data: {
				carrierName,
			},
		});

		return res;
	} catch (error) {
		return error;
	}
}

export async function deleteCarrier(id: number) {
	try {
		const res = await prisma.carrier.delete({
			where: {
				id,
			},
		});

		return res;
	} catch (error) {
		return error;
	}
}
