import { ApiError } from "../Errors/ApiError.js";

export default (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode, 
            message: err.message
        });
    }

    console.log(err.message)

    return res.status(500).json({
        statusCode: 500,
        message: 'Unknown error'
    });
}