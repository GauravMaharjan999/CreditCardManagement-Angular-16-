// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Customer } from '../models/customer';
// import { Order } from '../models/order.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {
//   private apiUrl = 'http://localhost:3000'; // JSON Server URL

//   constructor(private http: HttpClient) { }

//   getCustomers(): Observable<Customer[]> {
//     return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
//   }

//   getCustomerById(id: number): Observable<Customer> {
//     return this.http.get<Customer>(`${this.apiUrl}/customers/${id}`);
//   }

//   createCustomer(customer: Customer): Observable<Customer> {
//     return this.http.post<Customer>(`${this.apiUrl}/customers`, customer);
//   }

//   updateCustomer(customer: Customer): Observable<Customer> {
//     return this.http.put<Customer>(`${this.apiUrl}/customers/${customer.id}`, customer);
//   }

//   deleteCustomer(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/customers/${id}`);
//   }

//   createOrder(order: Order): Observable<Order> {
//     return this.http.post<Order>(`${this.apiUrl}/orders`, order);
//   }

//   deleteOrder(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/orders/${id}`);
//   }
// }
