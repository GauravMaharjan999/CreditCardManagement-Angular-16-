import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

creditEditCardForm!: FormGroup;
creditCardId: number = 0;
constructor(private fb: FormBuilder, private route : ActivatedRoute) {
  // Create the form group with form controls
  this.creditEditCardForm = this.fb.group({
    id: [this.creditCardId],
    name: ['', Validators.required],
    description: ['', Validators.required],
    bankName: ['', Validators.required],
    maxCredit: ['', [Validators.required, Validators.min(0)]],
    interestRate: ['', [Validators.required, Validators.min(0)]],
    active: [false],
    recommendedScore: ['', Validators.required],
    annualFee: ['', [Validators.required, Validators.min(0)]],
    termsAndConditions: ['', Validators.required],
    createdDate: ['', Validators.required],
    updatedDate: ['', Validators.required]
  });
}

ngOnInit(){
  const id =  parseInt(this.route.snapshot.paramMap.get("id") || '');
  this.creditCardId = id;
  
}
onSubmit() : void{
  alert(this.creditEditCardForm)
  console.log(this.creditEditCardForm);
  alert(JSON.stringify(this.creditEditCardForm, null, 10));
  }
  
}
