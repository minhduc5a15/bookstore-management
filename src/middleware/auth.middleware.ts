import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../types';

if (!process.env.JWT_SECRET) {
    throw new Error('Invalid/Missing environment variable: "JWT_SECRET"');
}

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['authToken'];

    if (req.path === '/api/auth/sign-up' || req.path === '/api/auth/sign-in') {
        return next();
    }

    if (req.path === '/sign-in' || req.path === '/sign-up') {
        if (!token) {
            return next();
        }
        try {
            const decode = jwt.verify(token, JWT_SECRET) as User;
            if (decode) {
                req.user = decode;
                req.token = token;
                return res.redirect('/');
            }
            return next();
        } catch (error) {
            return next();
        }
    } else {
        if (!token) return res.redirect('/sign-in');
        try {
            const decode = jwt.verify(token, JWT_SECRET) as User;
            if (decode) {
                req.user = decode;
                req.token = token;
            }
            return next();
        } catch (error) {
            return next();
        }
    }
};

export default authMiddleware;
