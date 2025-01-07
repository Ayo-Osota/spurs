"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = exports.signup = exports.login = exports.generateJwt = void 0;
const users_models_1 = require("../models/users.models");
const handleResponse_1 = require("../utils/handleResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenDecoder_1 = require("../utils/tokenDecoder");
const generateJwt = (userId) => {
    const jwtKey = process.env.JWT_SECRET;
    if (!jwtKey) {
        throw new Error('JWT_SECRET is not defined in environment variables.');
    }
    const payload = {
        userId,
    };
    const token = jsonwebtoken_1.default.sign(payload, jwtKey, {
        algorithm: 'HS256',
        expiresIn: '3d',
    });
    return token;
};
exports.generateJwt = generateJwt;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield users_models_1.User.findOne({ email });
        if (!user) {
            (0, handleResponse_1.sendErrorResponse)(res, {
                message: 'User not found, please signup',
                data: { _id: user._id },
                statusCode: 404,
            });
        }
        const isPasswordCorrect = yield user.comparePassword(password);
        if (!isPasswordCorrect) {
            (0, handleResponse_1.sendErrorResponse)(res, {
                message: 'Invalid email or password',
                statusCode: 401,
            });
        }
        const token = (0, exports.generateJwt)(user._id.toString());
        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            data: { user },
        });
    }
    catch (error) {
        (0, handleResponse_1.sendErrorResponse)(res, {});
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    try {
        if (!firstName || !lastName || !password || !email) {
            (0, handleResponse_1.sendErrorResponse)(res, {
                message: 'Please provide all required fields',
                statusCode: 400,
            });
        }
        const newUser = yield users_models_1.User.create({
            email,
            password,
            firstName,
            lastName,
        });
        const token = (0, exports.generateJwt)(newUser._id.toString());
        res.status(201).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            data: { user: newUser },
        });
    }
    catch (error) {
        (0, handleResponse_1.sendErrorResponse)(res, {});
    }
});
exports.signup = signup;
const loginRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = (0, tokenDecoder_1.getTokenData)(req);
        if (!decoded) {
            (0, handleResponse_1.sendErrorResponse)(res, {
                message: 'Invalid token',
                statusCode: 400,
            });
        }
        const { userId } = decoded;
        const user = yield users_models_1.User.findById(userId);
        if (!user) {
            (0, handleResponse_1.sendErrorResponse)(res, {
                message: 'User not found',
                statusCode: 404,
            });
        }
        req.user = { userId: user._id.toString() };
        next();
    }
    catch (err) {
        console.log(err);
        const resp = (0, handleResponse_1.sendErrorResponse)(res, {
            message: 'Session expired',
            statusCode: 403,
        });
        next(resp);
    }
});
exports.loginRequired = loginRequired;
