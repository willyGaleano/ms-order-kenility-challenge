import { CreateProductResponse } from '../models/dtos/create-product.dto';

export const CREATE_PRODUCT_OPERATION = {
  summary: 'Create a new product',
};

export const CREATE_PRODUCT_CONSUMES = 'multipart/form-data';

export const CREATE_PRODUCT_BODY = {
  description: 'Product details',
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 3, maxLength: 50 },
      sku: { type: 'string', minLength: 3, maxLength: 20 },
      price: { type: 'number', minimum: 0 },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const CREATE_PRODUCT_RESPONSE_SUCCESS = {
  status: 201,
  description: 'The product has been successfully created.',
  type: CreateProductResponse,
};

export const CREATE_PRODUCT_RESPONSE_ERROR = {
  status: 400,
  description: 'Bad Request',
};
