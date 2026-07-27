import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    getHealth() {
        return {
            success: true,
            service: 'forge-bug-engine-service',
            status: 'healthy',
            timestamp: new Date().toISOString(),
        };
    }
}
