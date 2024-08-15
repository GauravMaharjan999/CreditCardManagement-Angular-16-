import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDbService } from 'src/app/services/customerdb.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  customerEditForm: FormGroup = this.fb.group({
    customerId: [0],
    name: [''],
    email: [''],
    phone: [''],
    orders: this.fb.array([]),
  });
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cs: CustomerDbService
  ) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      // Load customer data if customer ID is available
      this.cs.getCustomerById(+customerId).subscribe({
        next: (customer: any) => {
          console.log(customer)
          this.populateForm(customer);
        },
        error: (error) => {
          console.error('Error loading customer data:', error);
        },
      });
    }
    
    // Log form value changes
    this.customerEditForm.valueChanges.subscribe(value => {
      console.log('Form Value Changed:', value);
    });
  }

  populateForm(customer: Customer): void {
    this.customerEditForm.patchValue({
      customerId: customer.customerId,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });

    // Clear existing orders and populate with the customer's orders
    this.orders.clear();
    if (customer.orders) {
      customer.orders.forEach((order) => {
        this.orders.push(this.createOrder(order));
      });
    }
  }

  createOrder(order?: any): FormGroup {
    return this.fb.group({
      orderId: [order?.orderId || 0],
      orderNo: [order?.orderNo || ''],
      customerId: [this.customerEditForm.get('customerId')?.value],
      pmethod: [order?.pmethod || ''],
      gtotal: [order?.gtotal || 0],
      customer: [''],
    });
  }

  get orders(): FormArray {
    return this.customerEditForm?.get('orders') as FormArray;
  }
  editOrder(): void {
    this.orders.push(this.createOrder());
  }

  removeOrder(index: number): void {
    this.orders.removeAt(index);
  }

  onSubmit(): void {
    if (this.customerEditForm?.valid) {
      const customerData: Customer = this.customerEditForm.value;

      this.cs.updateCustomer(customerData).subscribe({
        next: (response) => {
          alert('Customer edited successfully!' + JSON.stringify(response, null, 10));
          console.log('Customer edited successfully!', response);
          // this.router.navigate(['/customer']); // Navigate back to the customer list after editing
        },
        error: (error) => {
          console.error('Error editing customer:', error);
        }
      });

      console.log('Customer edited:', customerData);
    } else {
      console.error('Form is invalid');
    }
  }
}

