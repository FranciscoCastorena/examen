import { Request, Response, NextFunction } from 'express';

// Error personalizado 
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

//  todos los errores terminan aqu
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }

  // JSON mal formado en el body
  if (err instanceof SyntaxError) {
    res.status(400).json({ success: false, message: 'El JSON enviado no es válido' });
    return;
  }

  console.error(err);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
}
