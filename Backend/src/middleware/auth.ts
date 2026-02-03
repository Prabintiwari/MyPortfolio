import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  email: string;
  role: string;
}
interface JwtPayload {
  id: string;
  email: string;
  role: string;
  user: string;
}
interface AuthRequest extends Request {
  id?: string;
  email?: string;
  role?: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: User): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, message: "Access token required" });
    return;
  }
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    const payload = decoded as JwtPayload;
    req.id = payload.id;
    req.email = payload.email;
    req.role = payload.role;
    next();
  });
};

const AdminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.role) {
      res
        .status(400)
        .json({ success: false, message: "Authentication required" });
    }
    if (req.role === UserRole.ADMIN) {
      next();
      return;
    }
    res.status(403).json({
      success: false,
      message: "You do not have permission to perform this action",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

export { AuthRequest, generateToken, authenticateToken, AdminOnly };
