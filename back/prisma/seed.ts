import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const createCarriers = await prisma.carrier.createMany({
		data: [{ carrierName: 'XPO' }, { carrierName: 'CTS' }, { carrierName: 'Dart' }, { carrierName: 'Transport Design' }, { carrierName: 'DRT' }, { carrierName: 'Waletich' }, { carrierName: 'Taylor' }, { carrierName: 'Terminal' }, { carrierName: 'Trucking Proz' }, { carrierName: 'UTS' }, { carrierName: 'J&R' }, { carrierName: 'Kuehl' }, { carrierName: 'American Fast Freight' }, { carrierName: 'Ryder' }, { carrierName: 'Keene’s' }, { carrierName: 'XPO Logistics' }],
	});

	const createCategories = await prisma.category.createMany({
		data: [
			{ categoryName: 'Bays', color: 'blue-500' },
			{ categoryName: 'Completed', color: 'green-500' },
			{ categoryName: 'Dunnage', color: 'blue-500' },
			{ categoryName: 'Empties for Shipping', color: 'gray-500' },
			{ categoryName: 'In Process', color: 'yellow-500' },
			{ categoryName: 'Patio Trailers', color: 'yellow-600' },
			{ categoryName: 'Receiving', color: 'purple-400' },
			{ categoryName: 'Receiving - Rush', color: 'pink-600' },
			{ categoryName: 'Receiving - Storage', color: 'blue-900' },
			{ categoryName: 'Storage/Misc. Shipping Trailers', color: 'blue-300' },
			{ categoryName: 'Supermarket/Legacy/Eng', color: 'blue-500' },
			{ categoryName: 'Do Not Use', color: 'red-500' },
		],
	});

	const createTrailerLocations = await prisma.trailerLocation.createMany({
		data: [
			{ name: 'RVAC', dock: true },
			{ name: 'RMAN', dock: true, lot: true, lotName: 'SECONDARY' },
		],
	});

	const createSpots = await prisma.spots.createMany({
		data: [
			{ name: '50', trailerLocationId: 1 },
			{ name: '49', trailerLocationId: 1 },
			{ name: '48', trailerLocationId: 1 },
			{ name: '47', trailerLocationId: 1 },
			{ name: '46', trailerLocationId: 1 },
			{ name: '45', trailerLocationId: 1 },
			{ name: '44', trailerLocationId: 1 },
			{ name: '43', trailerLocationId: 1 },
			{ name: '42', trailerLocationId: 1 },
			{ name: '41', trailerLocationId: 1 },
			{ name: '40', trailerLocationId: 1 },
			{ name: '39', trailerLocationId: 1 },
			{ name: '38', trailerLocationId: 1 },
			{ name: '37', trailerLocationId: 1 },
			{ name: '36', trailerLocationId: 1 },
			{ name: '35', trailerLocationId: 1 },
			{ name: '34', trailerLocationId: 1 },
			{ name: '33', trailerLocationId: 1 },
			{ name: '32', trailerLocationId: 1 },
			{ name: '31', trailerLocationId: 1 },
			{ name: '30', trailerLocationId: 1 },
			{ name: '29', trailerLocationId: 1 },
			{ name: '28', trailerLocationId: 1 },
			{ name: '27', trailerLocationId: 1 },
			{ name: '26', trailerLocationId: 1 },
			{ name: '25', trailerLocationId: 1 },
			{ name: '24', trailerLocationId: 1 },
			{ name: '23', trailerLocationId: 1 },
			{ name: '22', trailerLocationId: 1 },
			{ name: '21', trailerLocationId: 1 },
			{ name: '20', trailerLocationId: 1 },
			{ name: '19', trailerLocationId: 1 },
			{ name: '18', trailerLocationId: 1 },
			{ name: '17', trailerLocationId: 1 },
			{ name: '16', trailerLocationId: 1 },
			{ name: '15', trailerLocationId: 1 },
			{ name: '14', trailerLocationId: 1 },
			{ name: '13', trailerLocationId: 1 },
			{ name: '12', trailerLocationId: 1 },
			{ name: '11', trailerLocationId: 1 },
			{ name: '10', trailerLocationId: 1 },
			{ name: '9', trailerLocationId: 1 },
			{ name: '8', trailerLocationId: 1 },
			{ name: '7', trailerLocationId: 1 },
			{ name: '6', trailerLocationId: 1 },
			{ name: '5', trailerLocationId: 1 },
			{ name: '4', trailerLocationId: 1 },
			{ name: '3', trailerLocationId: 1 },
			{ name: '2', trailerLocationId: 1 },
			{ name: '1', trailerLocationId: 1 },
			{ name: '50', trailerLocationId: 2 },
			{ name: '49', trailerLocationId: 2 },
			{ name: '48', trailerLocationId: 2 },
			{ name: '47', trailerLocationId: 2 },
			{ name: '46', trailerLocationId: 2 },
			{ name: '45', trailerLocationId: 2 },
			{ name: '44', trailerLocationId: 2 },
			{ name: '43', trailerLocationId: 2 },
			{ name: '42', trailerLocationId: 2 },
			{ name: '41', trailerLocationId: 2 },
			{ name: '40', trailerLocationId: 2 },
			{ name: '39', trailerLocationId: 2 },
			{ name: '38', trailerLocationId: 2 },
			{ name: '37', trailerLocationId: 2 },
			{ name: '36', trailerLocationId: 2 },
			{ name: '35', trailerLocationId: 2 },
			{ name: '34', trailerLocationId: 2 },
			{ name: '33', trailerLocationId: 2 },
			{ name: '32', trailerLocationId: 2 },
			{ name: '31', trailerLocationId: 2 },
			{ name: '30', trailerLocationId: 2 },
			{ name: '29', trailerLocationId: 2 },
			{ name: '28', trailerLocationId: 2 },
			{ name: '27', trailerLocationId: 2 },
			{ name: '26', trailerLocationId: 2 },
			{ name: '25', trailerLocationId: 2 },
			{ name: '24', trailerLocationId: 2 },
			{ name: '23', trailerLocationId: 2 },
			{ name: '22', trailerLocationId: 2 },
			{ name: '21', trailerLocationId: 2 },
			{ name: '20', trailerLocationId: 2 },
			{ name: '19', trailerLocationId: 2 },
			{ name: '18', trailerLocationId: 2 },
			{ name: '17', trailerLocationId: 2 },
			{ name: '16', trailerLocationId: 2 },
			{ name: '15', trailerLocationId: 2 },
			{ name: '14', trailerLocationId: 2 },
			{ name: '13', trailerLocationId: 2 },
			{ name: '12', trailerLocationId: 2 },
			{ name: '11', trailerLocationId: 2 },
			{ name: '10', trailerLocationId: 2 },
			{ name: '9', trailerLocationId: 2 },
			{ name: '8', trailerLocationId: 2 },
			{ name: '7', trailerLocationId: 2 },
			{ name: '6', trailerLocationId: 2 },
			{ name: '5', trailerLocationId: 2 },
			{ name: '4', trailerLocationId: 2 },
			{ name: '3', trailerLocationId: 2 },
			{ name: '2', trailerLocationId: 2 },
			{ name: '1', trailerLocationId: 2 },
		],
	});

	console.log({ createCarriers, createCategories, createTrailerLocations, createSpots });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
