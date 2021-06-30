import express, { Request, Response } from 'express';
import { addCarrier, deleteCarrier, getCarriers, updateCarrier } from '../controller/carrier';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
	const carriers = await getCarriers();
	res.json(carriers);
});

router.post('/', async (req: Request, res: Response) => {
	const { carrierName } = req.body;
	const carrier = await addCarrier(carrierName);
	res.json(carrier);
});

router.delete('/', async (req: Request, res: Response) => {
	const { id } = req.body;
	const carrier = await deleteCarrier(id);
	res.json(carrier);
});

router.put('/', async (req: Request, res: Response) => {
	const { id, carrierName } = req.body;

	const carrier = await updateCarrier(id, carrierName);
	res.json(carrier);
});

module.exports = router;
