import { NextFunction, Request, Response } from 'express';

export const AuthMiddleware = (AcceptPhrase: string) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!checkToken(token, AcceptPhrase)) {
      return res.sendStatus(403);
    }

    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export const checkToken = (token: string | undefined, AcceptPhrase: string) => {
  if (!token || !AcceptPhrase) {
    return false;
  }

  if (token.toLowerCase().startsWith('bearer')) {
    token = token.slice('bearer'.length).trim();
  }

  return token === AcceptPhrase;
};
