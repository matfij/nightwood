import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Guild } from "../model/guild.entity";

@Injectable()
export class GuildService {

    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
    ) {}
}
