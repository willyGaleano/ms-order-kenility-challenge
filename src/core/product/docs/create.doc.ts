export const CREATE_PRODUCT_TAGS = 'Product';

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
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const CREATE_PRODUCT_RESPONSE_SUCCESS = {
  status: 201,
  description: 'The product has been successfully created.',
  schema: {
    example: {
      data: {
        productId: '60c72b2f9b1d4c3a4c8e4d3b',
      },
    },
  },
};

export const CREATE_PRODUCT_RESPONSE_ERROR = {
  status: 400,
  description: 'Bad Request',
};
