import { Request, Response } from 'express';

export const NotFound = (req: Request, res: Response) => {
  res.sendStatus(404);
};
