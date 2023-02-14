import { Request, Response } from 'express';
import { GetTimeType } from '../interfaces';

export const GetTime = (req: Request, res: Response): void => {
  try {
    const time: GetTimeType = { epoch: Math.round(Date.now() / 1000) };

    res.status(200).json(time);
  } catch (err) {
    res.sendStatus(500);
  }
};
