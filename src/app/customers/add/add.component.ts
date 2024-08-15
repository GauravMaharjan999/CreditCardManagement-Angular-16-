import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDbService } from 'src/app/services/customerdb.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cs: CustomerDbService
  ) {
    this.customerForm = this.fb.group({
      customerId: [0],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      orders: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Log form value changes
    this.customerForm.valueChanges.subscribe(value => {
      console.log('Form Value Changed:', value);
    });
  }

  get orders(): FormArray {
    return this.customerForm.get('orders') as FormArray;
  }

  getOrderItems(orderIndex: number): FormArray {
    return this.orders.at(orderIndex).get('orderItems') as FormArray;
  }

  createOrder(): FormGroup {
    return this.fb.group({
      orderId: [0],
      orderNo: ['', Validators.required],
      customerId: [this.customerForm.get('customerId')?.value],
      pmethod: ['', Validators.required],
      gtotal: [0, [Validators.required, Validators.min(0)]],
      orderItems: this.fb.array([this.createOrderItem()]),
    });
  }

  createOrderItem(): FormGroup {
    return this.fb.group({
      itemId: [0],
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addOrder(): void {
    this.orders.push(this.createOrder());
  }

  removeOrder(index: number): void {
    this.orders.removeAt(index);
  }

  addOrderItem(orderIndex: number): void {
    this.getOrderItems(orderIndex).push(this.createOrderItem());
  }

  removeOrderItem(orderIndex: number, itemIndex: number): void {
    this.getOrderItems(orderIndex).removeAt(itemIndex);
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      debugger
      const customerData: Customer = this.customerForm.value;

      this.cs.createCustomer(customerData).subscribe({
        next: (response) => {
          alert('Customer added successfully!');
          console.log('Customer added successfully!', response);
          this.router.navigate(['/customer']); // Navigate back to the customer list after adding
        },
        error: (error) => {
          console.error('Error adding customer:', error);
        }
      });

      console.log('Customer added:', customerData);
    } else {
      console.error('Form is invalid');
    }
  }
}
