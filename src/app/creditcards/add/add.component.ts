import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  newCreditCard: CreditCard = {
    id: undefined,
    name: '',
    description: '',
    bankName: '',
    maxCredit: 5000,
    interestRate: 12,
    active: true,
    recommendedScore: '100-500',
    annualFee: 12,
    termsAndConditions: 'Terms and conditions for the credit card',
    createdDate: Date(),
    updatedDate: Date(),
  };

  creditCardDetails !: CreditCard ;
  creditCardDetailId !: Number ;

  constructor(private creditCardService : CreditcardsService, private router : Router) {
    
  }
  saveCreditCard() {
    console.log(this.newCreditCard);
    this.creditCardService.createCreditCard(this.newCreditCard).subscribe((data : CreditCard)=>{
      alert(JSON.stringify(data, null, 10));
     
    })
    this.router.navigate(['creditcards']);
  }
}
