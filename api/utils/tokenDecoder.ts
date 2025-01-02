import { Request } from "express";
import * as jwt from "jsonwebtoken";
import ApiError from "./apiError";

interface JwtPayload {
    userId: string;
}

export const getTokenData = (req: Request): JwtPayload => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        throw new ApiError(401, "Authorization header is missing.");
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Authorization Token is required");
    }

    const jwtKey = process.env.JWT_SECRET;

    if (!jwtKey) {
        throw new ApiError(
            400,
            "JWT_SECRET is not defined in environment variables.",
        );
    }

    const decoded = jwt.verify(token, jwtKey) as JwtPayload;

    return decoded;
};