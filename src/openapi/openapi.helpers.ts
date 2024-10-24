import { ZodSchema, z } from 'zod';
import { generateSchema } from '@anatine/zod-openapi';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ListingResourceToOpenApiSchema(
  dataSchema: ZodSchema,
  metaSchema?: ZodSchema,
): SchemaObject {
  const openApiDataSchema = generateSchema(dataSchema);
  let openApiMetaSchema = {
    type: 'object',
    nullable: true,
    default: null,
  } as any;
  if (metaSchema) {
    openApiMetaSchema = generateSchema(metaSchema);
  }

  const s = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: openApiDataSchema,
      },
      meta: openApiMetaSchema,
    },
  };
  return s as SchemaObject;
}

export function SingleResourceToOpenApiSchema(schema: ZodSchema): SchemaObject {
  const myOpenApiSchema = generateSchema(schema);
  return myOpenApiSchema as SchemaObject;
}

export function SingleResourceDeleteToOpenApiSchema(): SchemaObject {
  const myOpenApiSchema = { type: 'boolean' };
  return myOpenApiSchema as SchemaObject;
}


export function ApiPaginationQuery(paginationSchema: any) {
  return applyDecorators(
    ApiQuery({
      required: false,
      name: 'paging',
      style: 'deepObject',
      explode: true,
      type: 'object',
      schema: generateSchema(paginationSchema) as any,
    }),
  );
}
