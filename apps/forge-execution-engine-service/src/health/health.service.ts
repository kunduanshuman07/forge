import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    getHealth() {
        return {
            success: true,
            service: 'forge-execution-engine-service',
            status: 'healthy',
            timestamp: new Date().toISOString(),
        };
    }
}
