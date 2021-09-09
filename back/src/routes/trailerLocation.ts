import { TrailerLocation } from "@prisma/client";
import express, { Request, Response } from "express";
import {
  addTrailerLocation,
  getTrailerLocations,
  deleteTrailerLocation,
  updateTrailerLocation,
  getAvalibleTrailerLocations,
  getViews,
} from "../controller/trailerLocation";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const views = await getViews();
  res.json(views);
});

router.get("/avalibleLocations", async (_req: Request, res: Response) => {
  const trailerLocations = await getAvalibleTrailerLocations();
  res.json(trailerLocations);
});

router.post("/", async (req: Request, res: Response) => {
  const data: TrailerLocation = req.body;
  const trailerLocation = await addTrailerLocation(data);
  res.json(trailerLocation);
});

router.delete("/", async (req: Request, res: Response) => {
  const data = req.body;
  const trailerLocation = await deleteTrailerLocation(data.id);
  res.json(trailerLocation);
});

router.put("/", async (req: Request, res: Response) => {
  const data: TrailerLocation = req.body;

  const trailerLocation = await updateTrailerLocation(data);
  res.json(trailerLocation);
});

module.exports = router;
