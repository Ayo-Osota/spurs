"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static notFound() {
        return new ApiError(404, "Requested resource not found");
    }
    static badRequest(message) {
        return new ApiError(401, message);
    }
    static internalError() {
        return new ApiError(500, "Internal server error");
    }
}
exports.default = ApiError;
