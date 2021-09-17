import { Requests, Trailer } from "@prisma/client";
import express, { Request, Response } from "express";
// import { deleteData } from 'src/types';
import { addRequest, deleteRequest, getRequests } from "../controller/request";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const requests = await getRequests();
  res.json(requests);
});

router.post("/", async (req: Request, res: Response) => {
  const data: Requests = req.body;
  const request = await addRequest(data);
  res.json(request);
});

router.delete("/", async (req: Request, res: Response) => {
  const { id } = req.body;
  const request = await deleteRequest(id);
  res.json(request);
});

// router.put('/', async (req: Request, res: Response) => {
// 	const data: Trailer = req.body;

// 	const med = await updateTrailer(data);
// 	res.json(med);
// });

module.exports = router;
