import { Request, Response, NextFunction } from "express";
import { Auth } from "../firebase/firebase.config";

var authMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.ENV === "staging") return next();

  if (
    req.header("Authorization") &&
    req.header("Authorization")?.includes("Bearer")
  ) {
    const token: any = req
      .header("Authorization")
      ?.replace("Bearer", "")
      .trim();

    Auth.verifyIdToken(token)
      .then(function (decodedToken: any) {
        console.log("Decoded Token");
        return next();
      })
      .catch(function (error: any) {
        res.status(403).json({
          error,
          message: "Access Denied: Invalid token",
        });
      });
  } else {
    res.status(403).json({
      error: true,
      message: "Access Denied: Missing token",
    });
  }
};

export default authMiddleware;
