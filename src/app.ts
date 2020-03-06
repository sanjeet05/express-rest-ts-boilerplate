import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import methodOverride from "method-override";
import cors from "cors";
import helmet from "helmet";

import vars from "./config/vars";

const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// Our Express APP config
const app: Application = express();

// request logging. dev: console | production: file
app.use(morgan(vars.logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API Endpoints
app.get("/status", (req: Request, res: Response, next: NextFunction) => { res.send("Ok") });

// listen to requests
app.listen(vars.port, () => console.info(`server started on port ${vars.port} (${vars.env})`));