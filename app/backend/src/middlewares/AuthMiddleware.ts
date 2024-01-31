import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default class AuthMiddleware {
  private _secret = process.env.JWT_SECRET ?? 'secret';

  static extractToken(token: string | undefined) {
    if (token) {
      return token.split(' ')[1];
    }
  }

  auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = AuthMiddleware.extractToken(authorization);
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
      const decode = jwt.verify(token, this._secret);
      res.locals.user = decode;
      next();
    } catch (err) {
      if (err instanceof Error) {
        return res
          .status(401).json({ message: 'Token must be a valid token' });
      }
    }
  }
}
