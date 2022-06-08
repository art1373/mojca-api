import { Product } from '../products/products.entity';

export const calculateTotalPrice = (orderItems: Product[]) => {
  return orderItems.reduce((totalSum, i) => {
    return totalSum + i.unitPrice * i.quantity;
  }, 0);
};
