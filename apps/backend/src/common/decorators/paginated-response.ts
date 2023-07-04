import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PageDto } from "../definitions/pagination";

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel,) => {
    return applyDecorators(
        ApiExtraModels(PageDto),
        ApiOkResponse({
            schema: {
                allOf: [ 
                    { $ref: getSchemaPath(PageDto)},
                    { properties: { items: { type: 'array', items: { $ref: getSchemaPath(model) } } } },
                ],
            },
        }),
    );
};
