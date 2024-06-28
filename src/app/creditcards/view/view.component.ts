import { Component } from '@angular/core';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {


  creditCardDetail : CreditCard | undefined;
  constructor(private creditCardService : CreditcardsService) {
    this.creditCardService.getCreditCardById(3).subscribe((data : CreditCard)=>{
      this.creditCardDetail = data;
     
    })
  }
}
