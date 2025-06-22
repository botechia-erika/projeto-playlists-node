import { validationResult } from 'express-validator';
export const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        res.status(403);
        return res.send({ errors: error.array() });
    }
};

