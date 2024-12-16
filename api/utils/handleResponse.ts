import { Response } from "express";

export const sendSuccessResponse = (
    res: Response,
    {
        message = 'success',
        data,
        statusCode = 200
    }: {
        message?: string;
        data?: Object | Array<Object>;
        statusCode?: number;
    }
) => {
    const isArray = Array.isArray(data);
    const results = isArray ? data.length : undefined;

    return res.status(statusCode).json({
        status: true,
        message,
        ...(isArray && { results }),
        data,
    });
};

export const sendErrorResponse = (res: Response, {
    message = 'fail',
    data,
    statusCode = 500
}: {
    message?: string;
    data?: Object | Array<Object>;
    statusCode?: number;
}
) => {
    return res.status(statusCode).json({
        status: false,
        message,
        data,
    });
};