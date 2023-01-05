import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { unauthorized } from './unauthorized';
import { JWTPayload } from '../../utils/parseJWT';
import { Account } from '../../entities/Account';


export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
):  Promise<void> => {
    const auth = req?.headers?.authorization;
    if (!auth) {
        return unauthorized(res, { message: 'No authorization header found!' });
    }
    const token = auth.split(' ')[1];

    if (!token)
        return unauthorized(res, {
            message: 'Malformed authorization header!',
        });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
        const id = payload?.id;
        const account: any = await Account.findOne({
        //relations,
            where: {
                id,
            }       
        });
        req.user = account;
        return next();

    } catch {
        return unauthorized(res, { message: 'Invalid token!' });
    }

}