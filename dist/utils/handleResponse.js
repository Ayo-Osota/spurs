"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const sendSuccessResponse = (res, { message = 'success', data, statusCode = 200 }) => {
    const isArray = Array.isArray(data);
    const results = isArray ? data.length : undefined;
    return res.status(statusCode).json(Object.assign(Object.assign({ status: true, message }, (isArray && { results })), { data }));
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res, { message = 'fail', data, statusCode = 500 }) => {
    return res.status(statusCode).json({
        status: false,
        message,
        data,
    });
};
exports.sendErrorResponse = sendErrorResponse;
