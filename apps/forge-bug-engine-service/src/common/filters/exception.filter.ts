import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
      const ctx = host.switchToHttp();
  
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      const statusCode =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      let message = 'Internal server error';
      let errors: unknown = null;
  
      if (exception instanceof HttpException) {
        const exceptionResponse = exception.getResponse();
  
        if (typeof exceptionResponse === 'string') {
          message = exceptionResponse;
        } else if (typeof exceptionResponse === 'object') {
          const res = exceptionResponse as Record<string, unknown>;
  
          message = (res.message as string) ?? exception.message;
  
          if (Array.isArray(res.message)) {
            errors = res.message;
            message = 'Validation failed.';
          } else {
            errors = res.errors ?? null;
          }
        }
      }
  
      response.status(statusCode).json({
        statusCode,
        status: 'error',
        message,
        timestamp: new Date().toISOString(),
        path: request.originalUrl,
        method: request.method,
        data: null,
        errors,
      });
    }
  }