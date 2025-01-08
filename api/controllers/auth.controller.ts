import { NextFunction, Request, Response } from 'express'
import { User } from '../models/users.models'
import { sendErrorResponse, sendSuccessResponse } from '../utils/handleResponse'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getTokenData } from '../utils/tokenDecoder'

export const generateJwt = (userId: string) => {
    const jwtKey = process.env.JWT_SECRET

    if (!jwtKey) {
        throw new Error('JWT_SECRET is not defined in environment variables.')
    }

    const payload = {
        userId,
    }

    const token = jwt.sign(payload, jwtKey, {
        algorithm: 'HS256',
        expiresIn: '3d',
    })

    return token
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (!user) {
            sendErrorResponse(res, {
                message: 'User not found, please signup',
                data: { _id: user._id },
                statusCode: 404,
            })
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            sendErrorResponse(res, {
                message: 'Invalid email or password',
                statusCode: 401,
            })
        }

        const token = generateJwt(user._id.toString())

        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            data: { user },
        })
    } catch (error) {
        sendErrorResponse(res, {})
    }
}

export const signup = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body

    try {
        if (!firstName || !lastName || !password || !email) {
            sendErrorResponse(res, {
                message: 'Please provide all required fields',
                statusCode: 400,
            })
        }

        let user = await User.findOne({ email })

        // If user already exists, log them in directly
        if (user) {
            const isPasswordCorrect = await user.comparePassword(password)
            if (!isPasswordCorrect) {
                sendErrorResponse(res, {
                    message: 'Invalid email or password',
                    statusCode: 401,
                })
                return
            }

            const token = generateJwt(user._id.toString())
            res.status(200).json({
                status: 'success',
                message: 'Logged in successfully',
                token,
                data: { user },
            })
            return
        }

        const newUser = await User.create({
            email,
            password,
            firstName,
            lastName,
        })

        const token = generateJwt(newUser._id.toString())
        res.status(201).json({
            status: 'success',
            message: 'Account created and Logged in successfully',
            token,
            data: { user: newUser },
        })
    } catch (error) {
        sendErrorResponse(res, {})
    }
}

export const loginRequired = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const decoded = getTokenData(req)

        if (!decoded) {
            sendErrorResponse(res, {
                message: 'Invalid token',
                statusCode: 400,
            })
        }

        const { userId } = decoded

        const user = await User.findById(userId)

        if (!user) {
            sendErrorResponse(res, {
                message: 'User not found',
                statusCode: 404,
            })
        }

        req.user = { userId: user._id.toString() }

        next()
    } catch (err) {
        console.log(err)
        const resp = sendErrorResponse(res, {
            message: 'Session expired',
            statusCode: 403,
        })
        next(resp)
    }
}
