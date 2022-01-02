import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class ErrorService {

    throw(message: string): BadRequestException {
        throw new BadRequestException(message);
    }
}
