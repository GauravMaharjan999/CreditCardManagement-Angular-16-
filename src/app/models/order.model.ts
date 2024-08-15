import { OrderItem } from "./order-item.model";

export interface Order {
  orderId: number;
  orderNo: string;
  customerId: number;
  pmethod: string;
  gtotal: number;
  customer: string;
  orderItems: OrderItem[];

}
