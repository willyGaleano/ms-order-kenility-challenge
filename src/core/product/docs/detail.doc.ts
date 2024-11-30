export const DETAIL_OPERATION = {
  summary: 'Get product details by ID',
};

export const DETAIL_PARAM = {
  name: 'id',
  description: 'Product ID',
  type: String,
};

export const DETAIL_RESPONSE_SUCCESS = {
  status: 200,
  description: 'The product details',
  schema: {
    example: {
      data: {
        product: {
          id: '60c72b2f9b1d4c3a4c8e4d3b',
          name: 'Product Name',
          sku: 'SKU123',
          price: 100,
          imageUrl: 'http://example.com/image.jpg',
          createdAt: '2021-06-13T12:00:00Z',
          updatedAt: '2021-06-13T12:00:00Z',
        },
      },
    },
  },
};

export const DETAIL_RESPONSE_NOT_FOUND = {
  status: 404,
  description: 'Product not found',
};
