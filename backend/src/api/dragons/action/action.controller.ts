import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ActionService } from './service/action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';

@Controller('action')
@UseGuards(JwtAuthGuard)
@ApiTags('DragonActionController')
export class ActionController {

  constructor(
    private actionService: ActionService
  ) {}

  @Post()
  create(@Body() createActionDto: CreateActionDto) {
    return this.actionService.create(createActionDto);
  }

  @Get()
  findAll() {
    return this.actionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActionDto: UpdateActionDto) {
    return this.actionService.update(+id, updateActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionService.remove(+id);
  }
}
