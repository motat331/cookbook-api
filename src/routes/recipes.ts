import express, { Request, Response } from "express";
const Router = express.Router;

import { Recipes } from "../models/Recipes";

import { Types } from "mongoose";
var ObjectId = Types.ObjectId;

const router = Router();

router.post("/recipe", async (req: Request, res: Response) => {
  try {
    const model = await new Recipes(req.body).save();
    console.log("MODEL: ", model);
    res.status(201).json(model);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.get("/recipes", async (req: Request, res: Response) => {
  try {
    const data = await Recipes.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.get("/recipe/:mongo_id", async (req: Request, res: Response) => {
  try {
    const data = await Recipes.findOne({
      _id: new ObjectId(req.params.mongo_id),
    });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.patch("/recipe/:mongo_id", async (req: any, res: any) => {
  try {
    const data = await Recipes.findOneAndUpdate(
      {
        _id: new ObjectId(req.params.mongo_id),
      },
      req.body,
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.delete("/recipe/:mongo_id", async (req: any, res: any) => {
  try {
    const data = await Recipes.deleteOne(
      {
        _id: new ObjectId(req.params.mongo_id),
      },
      req.body
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
export { router };
