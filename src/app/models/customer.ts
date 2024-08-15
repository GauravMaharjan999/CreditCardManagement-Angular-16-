import { CreditCard } from "./credit-card";
import { Order } from "./order.model";

export interface Customer {
  customerId: number;
    name?: string;
    email?: string;
    phone?: string;
    // creditCards: CreditCard[];
  orders: Order[];
  }
  