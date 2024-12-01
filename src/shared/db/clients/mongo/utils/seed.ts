import 'dotenv/config';
import mongoose from 'mongoose';
import {
  OrderDocument,
  OrderSchema,
} from '../../../../../core/order/models/schemas/order.schema';
import {
  ProductDocument,
  ProductSchema,
} from '../../../../../core/product/models/schemas/product.schema';
import { OrderStatus } from '../../../../../core/order/models/enums/order.enum';

const MONGODB_URI = process.env.MONGODB_URI;

const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
const Order = mongoose.model<OrderDocument>('Order', OrderSchema);

async function seedDatabase() {
  await mongoose.connect(MONGODB_URI);

  const productCount = await Product.countDocuments();

  if (productCount === 0) {
    const products = await Product.insertMany([
      {
        name: 'Product 1',
        sku: 'SKU1',
        imageUrl: 'http://example.com/image1.jpg',
        price: 10.5,
      },
      {
        name: 'Product 2',
        sku: 'SKU2',
        imageUrl: 'http://example.com/image2.jpg',
        price: 20,
      },
      {
        name: 'Product 3',
        sku: 'SKU3',
        imageUrl: 'http://example.com/image3.jpg',
        price: 30.5,
      },
      {
        name: 'Product 4',
        sku: 'SKU4',
        imageUrl: 'http://example.com/image4.jpg',
        price: 40,
      },
      {
        name: 'Product 5',
        sku: 'SKU5',
        imageUrl: 'http://example.com/image5.jpg',
        price: 50.5,
      },
    ]);
    console.log('Total products created:', products.length);
  } else {
    console.log('Products already exist, skipping creation.');
  }

  const orderCount = await Order.countDocuments();
  if (orderCount === 0) {
    const products = await Product.find();
    const orders = [
      {
        customerName: 'Customer 1',
        total: products[0].price + products[1].price,
        status: OrderStatus.COMPLETED,
        products: [products[0]._id, products[1]._id, products[2]._id],
      },
      {
        customerName: 'Customer 2',
        total: products[2].price + products[3].price,
        status: OrderStatus.COMPLETED,
        products: [products[2]._id, products[3]._id],
      },
      {
        customerName: 'Customer 3',
        total: products[4].price,
        status: OrderStatus.COMPLETED,
        products: [products[4]._id],
      },
      {
        customerName: 'Customer 4',
        total: products[0].price + products[2].price,
        status: OrderStatus.COMPLETED,
        products: [products[0]._id, products[2]._id],
      },
      {
        customerName: 'Customer 5',
        total: products[1].price + products[3].price,
        status: OrderStatus.PENDING,
        products: [products[1]._id, products[3]._id],
      },
      {
        customerName: 'Customer 6',
        total: products[4].price,
        status: OrderStatus.CANCELLED,
        products: [products[4]._id],
      },
    ];

    const ordersCreated = await Order.insertMany(orders);
    console.log('Total orders created:', ordersCreated.length);
  } else {
    console.log('Orders already exist, skipping creation.');
  }

  console.log('Database seeded!');
  await mongoose.disconnect();
}

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err);
  mongoose.disconnect();
});
