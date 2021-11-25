import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { Any } from "typeorm";
import { PageDto } from "../definitions/pagination";

export const PaginatedResponse = <TModel extends Type<any>>(model: TModel,) => {
    return applyDecorators(
        ApiExtraModels(PageDto, Any),
        ApiOkResponse({
            schema: {
                allOf: [ 
                    { $ref: getSchemaPath(PageDto)},
                    { properties: { data: { type: 'array', items: { $ref: getSchemaPath(model) } } } },
                ],
            },
        }),
    );
};
