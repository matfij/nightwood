import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { DragonActionService } from './service/dragon-action.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';
import { PaginationInterceptor } from 'src/common/interceptors/pagination.interceptor';
import { PageExpeditionDto } from './model/dto/page-expedition.dto';

@Controller('action')
@UseGuards(JwtAuthGuard)
@ApiTags('DragonActionController')
export class DragonActionController {

  constructor(
    private actionService: DragonActionService
  ) {}

  @Post('getExpeditions')
  @UseInterceptors(PaginationInterceptor)
  @ApiOkResponse({ type: PageExpeditionDto })
  getExpeditions(): Promise<PageExpeditionDto> {
    return this.actionService.getExpeditions();
  }

}
