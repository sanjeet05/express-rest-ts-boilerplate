import express, { Request, Response, NextFunction, Router } from "express";

import authRoute from './authRoute';

// create router
const router: Router = express.Router();

// get the server status
router.get("/status", (req: Request, res: Response) => res.send("OK"));

// auth routes
router.use("/auth", authRoute);

export default router;
