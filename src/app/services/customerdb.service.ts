import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDbService {
  private apiUrl = 'https://localhost:7285/api'; // JSON Server URL

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   }

  getCustomers(): Observable<Customer[]> {
    
    var res =  this.http.get<Customer[]>(`${this.apiUrl}/customer`,  {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
    
    return res;
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customer/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    
    return this.http.post<Customer>(`${this.apiUrl}/Customer`, customer,

      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      catchError(error => {
        
        console.error("An error occurred:", error)   ;
        // Return a default customer or handle the error as appropriate
        const defaultCustomer: Customer = {
          customerId: 0, 
          name: 'Default',
          email:'',
          phone:'',
          orders: []
        }; // Adjust to your Customer model
        return of(defaultCustomer);
      })
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/customer/${customer.customerId}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customer/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${id}`);
  }
}
