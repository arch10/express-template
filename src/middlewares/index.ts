import { Request, Response, NextFunction } from 'express';
import { sendError, logger } from '../util';

const generateLog = (
  req: Request,
  res: Response,
  status: number,
  errorMsg: string,
  metaData: string
) => {
  return `${req.method} ${req.originalUrl}: ${status}-${res.statusMessage} - ${errorMsg} - ${metaData} - ${req.ip}`;
};

export const handleError = (
  err: ReturnType<typeof sendError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = err.message || 'Unknown error';
  const metadata = err.metadata ? JSON.stringify(err.metadata) : 'No Metadata';
  switch (err.status) {
    case 400:
      res.status(400).json(sendError(400, errorMessage));
      logger.warn(generateLog(req, res, 400, errorMessage, metadata));
      break;
    case 401:
      res.status(401).json(sendError(401, errorMessage));
      logger.warn(generateLog(req, res, 401, errorMessage, metadata));
      break;
    case 403:
      res.status(403).json(sendError(403, 'Forbidden'));
      logger.warn(generateLog(req, res, 403, errorMessage, metadata));
    case 404:
      res.status(404).json(sendError(404, errorMessage));
      logger.warn(generateLog(req, res, 404, errorMessage, metadata));
      break;
    default:
      res.status(500).json(sendError(500, 'Internal Server Error'));
      const log = generateLog(
        req,
        res,
        err.status || 500,
        errorMessage,
        metadata
      );
      logger.error(log);
  }
};

export const handlePageNotFound = (req: Request, res: Response) => {
  res.status(404).json(sendError(404, 'Page not found'));
  logger.info(
    `${req.method} ${req.originalUrl}: 404-${res.statusMessage} - ${req.ip}`
  );
};
