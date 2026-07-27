import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const startTime = Date.now();

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const { method, originalUrl, ip, headers } = request;

        this.logger.log(
            `Incoming Request | ${method} ${originalUrl} | IP: ${ip} | User-Agent: ${headers['user-agent']}`,
            'HTTP',
        );

        return next.handle().pipe(
            tap({
                next: () => {
                    this.logger.log(
                        `Completed Request | ${method} ${originalUrl} | Status: ${response.statusCode} | Duration: ${Date.now() - startTime} ms`,
                        'HTTP',
                    );
                },
                error: (error) => {
                    this.logger.error(
                        `Failed Request | ${method} ${originalUrl} | Status: ${response.statusCode} | Duration: ${Date.now() - startTime} ms | Error: ${error?.message ?? 'Unknown Error'}`,
                        error?.stack,
                        'HTTP',
                    );
                },
            }),
        );
    }
}