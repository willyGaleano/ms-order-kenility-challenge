import { ProductDetailResponse } from '../models/dtos/detail-product.dto';

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
  type: ProductDetailResponse,
};

export const DETAIL_RESPONSE_NOT_FOUND = {
  status: 404,
  description: 'Product not found',
};
