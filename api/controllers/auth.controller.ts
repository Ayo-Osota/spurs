import { Request, Response } from "express";
import { User } from "../models/users.models";
import { sendErrorResponse, sendSuccessResponse } from "../utils/handleResponse";
import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJwt = (
    userId: string,
) => {
    const jwtKey = process.env.JWT_SECRET;

    if (!jwtKey) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const payload = {
        userId
    };

    const token = jwt.sign(payload, jwtKey, {
        algorithm: "HS256",
        expiresIn: "3d",
    });

    return token;
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            sendErrorResponse(res,
                {
                    message: 'User not found, please signup',
                    data: { _id: user._id },
                    statusCode: 404
                })
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            sendErrorResponse(res, { message: 'Invalid email or password', statusCode: 401 })
        }

        const token = generateJwt(user._id.toString())

        res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            token,
            data: { user },
        });
    } catch (error) {
        sendErrorResponse(res, {})
    }
};

export const signup = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        if (!firstName || !lastName || !password || !email) {
            sendErrorResponse(res,
                {
                    message: 'Please provide all required fields',
                    statusCode: 400
                })
        }

        const newUser = await User.create({
            email,
            password,
            firstName,
            lastName,
        });

        const token = generateJwt(newUser._id.toString())
        res.status(201).json({
            status: "success",
            message: "Logged in successfully",
            token,
            data: { user: newUser },
        });
    } catch (error) {
        sendErrorResponse(res, {})
    }
};

