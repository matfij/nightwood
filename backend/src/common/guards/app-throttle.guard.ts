import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

export class AppThrottlerGuard extends ThrottlerGuard {

    protected throwThrottlingException(): void {
        throw new ThrottlerException('errors.rateLimitExceeded');
    }
}
