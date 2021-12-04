import { Injectable } from '@nestjs/common';
import { CreateActionDto } from '../model/dto/create-action.dto';
import { UpdateActionDto } from '../model/update-action.dto';

@Injectable()
export class ActionService {

  create(createActionDto: CreateActionDto) {
    return 'This action adds a new action';
  }

  findAll() {
    return `This action returns all action`;
  }

  findOne(id: number) {
    return `This action returns a #${id} action`;
  }

  update(id: number, updateActionDto: UpdateActionDto) {
    return `This action updates a #${id} action`;
  }

  remove(id: number) {
    return `This action removes a #${id} action`;
  }
}
