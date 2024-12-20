import multer from 'multer';
import { ApiError } from '../Errors/ApiError.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/images"); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
        console.log("multer")
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(ApiError.badRequest("Invalid file type. Only images are allowed."));
        }
    },
});

export const uploadMiddleware = upload.single("image");