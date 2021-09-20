// @ts-nocheck
import { Trailer } from "@prisma/client";
import express, { Request, Response } from "express";
import { deleteData } from "src/types";
import {
  addTrailer,
  getTrailers,
  deleteTrailer,
  updateTrailer,
} from "../controller/trailer";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const trailers = await getTrailers();
  res.json(trailers);
});

router.post("/", async (req: Request, res: Response) => {
  const data: Trailer = req.body;
  const trailer = await addTrailer(data);
  res.json(trailer);
});

router.delete("/", async (req: Request, res: Response) => {
  const data: deleteData = req.body;
  const trailer = await deleteTrailer(data.trailerId);
  res.json(trailer);
});

router.put("/", async (req: Request, res: Response) => {
  const data: Trailer = req.body;

  const med = await updateTrailer(data);
  res.json(med);
});

module.exports = router;
