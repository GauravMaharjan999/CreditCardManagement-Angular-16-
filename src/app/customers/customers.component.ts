import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
// import { CustomerService } from '../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDbService } from '../services/customerdb.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  displayedColumns: string[] = [
    'id', 
    'name'
    , 'email', 'phone'
    , 'actions'
  ];

  constructor(private customerService: CustomerDbService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
    console.log("This is Customer List", customers)

      this.customers = customers;
    });
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      this.customerService.deleteCustomer(customer.customerId).subscribe(() => {
        this.loadCustomers();
      });
    }
  }

  addCustomer(): void {
    this.selectedCustomer = { customerId: 0, name: '', orders: [], 
      email:'',
      phone:''
      }; // Reset form for new customer
  }

  onCustomerUpdated(): void {
    this.loadCustomers();
    this.selectedCustomer = null;
  }
}
