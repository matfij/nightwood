import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { WS_REQUEST_LIMIT, WS_REQUEST_TTL } from "src/configuration/app.config";

@Injectable()
export class WsThrottlerGuard extends ThrottlerGuard {
    
    async handleRequest(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient();
        const ip = client.conn.remoteAddress;
        const key = this.generateKey(context, ip);
        await this.storageService.increment(key, WS_REQUEST_TTL);
        const ttls = this.storageService.storage[key];
        if (ttls.totalHits > WS_REQUEST_LIMIT) return false;
        return true;
    }
}