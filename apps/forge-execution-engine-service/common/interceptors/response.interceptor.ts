import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<any> {
      const response = context.switchToHttp().getResponse();
  
      return next.handle().pipe(
        map((body) => ({
          statusCode: response.statusCode,
          status: 'success',
          message: body?.message ?? 'Success',
          timestamp: new Date().toISOString(),
          data: body?.data ?? null,
          errors: null,
        })),
      );
    }
  }