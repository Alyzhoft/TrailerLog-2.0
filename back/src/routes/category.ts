import express, { Request, Response } from 'express';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controller/category';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
	const categories = await getCategories();
	res.json(categories);
});

router.post('/', async (req: Request, res: Response) => {
	const { categoryName, color } = req.body;
	const category = await addCategory(categoryName, color);
	res.json(category);
});

router.delete('/', async (req: Request, res: Response) => {
	const { id } = req.body;
	const category = await deleteCategory(id);
	res.json(category);
});

router.put('/', async (req: Request, res: Response) => {
	const { id, categoryName, color } = req.body;

	const category = await updateCategory(id, categoryName, color);
	res.json(category);
});

module.exports = router;
