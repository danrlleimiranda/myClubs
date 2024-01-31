import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default class AuthMiddleware {
  private _secret = process.env.JWT_SECRET ?? 'secret';

  static extractToken(token: string | undefined) {
    if (token) {
      const parts = token.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        return parts[1];
      }
    }
  }

  auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = AuthMiddleware.extractToken(authorization) ?? '';
    try {
      const decode = jwt.verify(token, this._secret);
      res.locals.user = decode;
      next();
    } catch (err) {
      return res
        .status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
