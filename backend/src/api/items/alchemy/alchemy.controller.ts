import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/users/auth/util/jwt.guard';

@Controller('alchemy')
@UseGuards(JwtAuthGuard)
@ApiTags('AlchemyController')
export class AlchemyController {

    constructor() {}
}
