import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
dotenv.config();

import authRoute from "./routes/auth.routes";
import projectsRoute from "./routes/projects.routes";

const app = express();
const PORT =
  process.env.PORT ||
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5000",
      credentials: true,
    }),
  );
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/projects", projectsRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "OK", message: `Server is running on ${PORT}` });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
