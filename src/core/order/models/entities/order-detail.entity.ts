export class ProductOrderDetail {
  id: string;
  name: string;
  sku: string;
  imageUrl: string;
  price: number;
}

export class OrderDetail {
  id: string;
  customerName: string;
  total: number;
  status: string;
  products: ProductOrderDetail[];
}
