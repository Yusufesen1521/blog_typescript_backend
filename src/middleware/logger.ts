import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.url;

  console.log(`${timestamp} - ${method} request to ${url}`);
  next();
};

export default logger;