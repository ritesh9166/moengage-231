import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" || process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routers/auth.routes.js";
import responseRouter from "./routers/response.routes.js";
import listRouter from "./routers/list.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/response-code", responseRouter);
app.use("/api/v1/lists", listRouter);

export { app };
