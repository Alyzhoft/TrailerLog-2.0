import { Spots } from "@prisma/client";
import express, { Request, Response } from "express";
import {
  getSpots,
  addSpot,
  deleteSpot,
  updateSpot,
  getAvalibleSpots,
} from "../controller/spots";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const spots = await getSpots();
  res.json(spots);
});

router.get("/avalibleSpots", async (_req: Request, res: Response) => {
  const spots = await getAvalibleSpots();
  res.json(spots);
});

router.post("/", async (req: Request, res: Response) => {
  const data: Spots = req.body;
  const spot = await addSpot(data);
  res.json(spot);
});

router.delete("/", async (req: Request, res: Response) => {
  const data = req.body;
  const spot = await deleteSpot(data.id);
  res.json(spot);
});

router.put("/", async (req: Request, res: Response) => {
  const data: Spots = req.body;

  const spot = await updateSpot(data);
  res.json(spot);
});

module.exports = router;
