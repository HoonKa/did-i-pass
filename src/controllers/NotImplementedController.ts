import { Request, Response } from 'express';

function notImplemented(req: Request, res: Response): void {
  res.sendStatus(501); // 501 Not Implemented
}
export { notImplemented };
