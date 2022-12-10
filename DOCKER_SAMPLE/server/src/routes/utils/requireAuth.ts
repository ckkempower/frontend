import jwt from 'express-jwt';

export const requireAuth = jwt({
    secret: process.env.JWT_SECRET as string,
    credentialsRequired: false,
    requestProperty: 'Authorization',
    algorithms: ['HS256'],
    userProperty: 'user',
}) as jwt.RequestHandler;
