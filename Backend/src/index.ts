import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
dotenv.config();

import publicRoute from "./routes/publicRoute";
import adminRoute from "./routes/adminRoute";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        process.env.FRONTEND_URL || "http://localhost:5173",
        process.env.ADMIN_URL || "http://localhost:5174",
      ];

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (/^http:\/\/192\.168\.\d+\.\d+:\d+$/.test(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api", publicRoute);
app.use("/api/admin", adminRoute);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "OK", message: `Server is running on ${PORT}` });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
