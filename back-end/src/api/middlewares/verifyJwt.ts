import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET!);
            if (decode) {
                next();
            } else {
                throw new Error();
            }            
        } else {
            throw new Error();
        }
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }
}

export { verifyJwt };