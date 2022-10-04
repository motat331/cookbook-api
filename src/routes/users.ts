import express, { Request, Response } from "express";
import { Users } from "../models/Users";
import { Types } from "mongoose";
const Router = express.Router;
const router = Router();
const ObjectId = Types.ObjectId;

router.post("/user", async (req: Request, res: Response) => {
  try {
    const model = await new Users(req.body).save();
    res.status(201).json(model);
  } catch (err: any) {
    if (err?.message.includes("E11000"))
      res.status(400).json({
        error: true,
        message: "Duplicate unique index passed, check firebase_id, or email",
      });
    else
      res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
  }
});

router.get("/user/:firebase_id", async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({
      firebase_id: req.params.firebase_id,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.delete("/user/:mongo_id", async (req: any, res: any) => {
  try {
    const data = await Users.deleteOne(
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
