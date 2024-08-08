import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
// import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDbService } from 'src/app/services/customerdb.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  customer: Customer = {
    customerId: 0, 
          name: 'Default',
          email:'',
          phone:'',
          orders: []
  };

  constructor(private router: Router, private cs: CustomerDbService) {}

  addOrder() {
    this.customer.orders.push({
      orderId: 0,
      orderNo: '',
      customerId: this.customer.customerId,
      pmethod: '',
      gtotal: 0,
      customer: '',
    });
  }

  removeOrder(index: number) {
    this.customer.orders.splice(index, 1);
  }

  onSubmit() {
    // Here you would typically call a service to save the customer
    this.cs.createCustomer(this.customer).subscribe({
      next: (response) => {
        
        
        alert('Customer added successfully!'+ JSON.stringify(response, null, 10))
        console.log('Customer added successfully!', response);
      },
      error: (error) => {
        console.error('Error adding customer:', error);
      }
    });
    console.log('Customer added:', this.customer);
    // this.router.navigate(['/customer']); // Navigate back to the customer list after adding
  }
}
