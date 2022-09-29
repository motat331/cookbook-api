import express, { Response } from "express";
const Router = express.Router;
import { Types } from "mongoose";
import functions from "../functions/upload";
import upload from "express-fileupload";

var ObjectId = Types.ObjectId;

const router = Router();

router.post(
  "/upload",
  upload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: false,
  }),
  async (req: any, res: Response) => {
    if (!req.files?.file) {
      res.status(401).send({ error: true, message: "No file uploaded" });
      return;
    }

    try {
      const downloadUrl = await functions.uploadFile(req);
      res.status(201).json(downloadUrl);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  }
);

export { router };
