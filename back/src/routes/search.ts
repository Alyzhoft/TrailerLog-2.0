// @ts-nocheck
import express, { Request, Response } from "express";
// import { deleteData } from 'src/types';
import { search } from "../controller/search";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const carrier = req.query.carrier;
  const category = req.query.category;
  const trailerLocation = req.query.trailerLocation;
  const departed = req.query.departed;
  const trailerNumber = req.query.trailerNumber;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const trailers = await search({
    carrier,
    category,
    trailerLocation,
    departed,
    trailerNumber,
    page,
    limit,
  });

  res.json(trailers);
});

router.post("/", (req: Request, res: Response) => {
  console.log(req);
});

module.exports = router;
