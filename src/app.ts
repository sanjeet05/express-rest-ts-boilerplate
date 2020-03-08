import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import methodOverride from "method-override";
import cors from "cors";
import helmet from "helmet";

import vars from "./config/vars";
import * as mongoose from './config/mongoose';

// api routes
import routes from './api/routes/v1';

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

// mount api v1 routes
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// catch 404 and forward to error handler
// app.use(error.notFound);

// error handler, send stacktrace only during development
// app.use(error.handler);

// listen to requests
app.listen(vars.port, () => console.info(`server started on port ${vars.port} (${vars.env})`));