import express, { Router } from "express";

import * as authController from '../../controllers/authController';

// create router
const router: Router = express.Router();

// routes
router.route("/register").post(authController.register);


export default router;

