class ApiError {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    static notFound(): ApiError {
        return new ApiError(404, "Requested resource not found");
    }

    static badRequest(message: string): ApiError {
        return new ApiError(401, message);
    }

    static internalError(): ApiError {
        return new ApiError(500, "Internal server error");
    }
}

export default ApiError;