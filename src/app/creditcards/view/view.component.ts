import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {


  creditCardDetails !: CreditCard ;
  creditCardDetailId !: Number ;

  constructor(private creditCardService : CreditcardsService, private router : ActivatedRoute) {
    console.log(this.router)
    this.creditCardDetailId = parseInt(this.router.snapshot.paramMap.get("id") ||'');
    
    this.creditCardService.getCreditCardById(this.creditCardDetailId).subscribe((data : CreditCard)=>{
      this.creditCardDetails = data;
     
    })
  }
}
