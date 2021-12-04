import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { DragonActionService } from './service/dragon-action.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';

@Controller('action')
@UseGuards(JwtAuthGuard)
@ApiTags('DragonActionController')
export class DragonActionController {

  constructor(
    private actionService: DragonActionService
  ) {}

}
