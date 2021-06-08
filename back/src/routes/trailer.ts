import express, { Request, Response } from 'express';
import { addTrailer, getTrailers, deleteTrailer, updateTrailer } from '../controller/trailer';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	const trailers = await getTrailers();
	res.json(trailers);
});

router.post('/', async (req: Request, res: Response) => {
	const data: postData = req.body;
	const trailer = await addTrailer(data.trailerNumber, data.carrier, data.category, data.trailerLocation, data.comments);
	res.json(trailer);
});

router.delete('/', async (req: Request, res: Response) => {
	const data: deleteData = req.body;
	const trailer = await deleteTrailer(data.trailerId);
	res.json(trailer);
});

router.put('/', async (req: Request, res: Response) => {
	const data: putData = req.body;

	const med = await updateTrailer(data.trailerId, data.trailerNumber, data.carrier, data.category, data.comments);
	res.json(med);
});

module.exports = router;
