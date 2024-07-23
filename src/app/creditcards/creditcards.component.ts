import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';




@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss']
})
export class CreditcardsComponent {


  creditCards : CreditCard[] = [];
  constructor(private creditCardService : CreditcardsService) {
    this.creditCardService.getCreditCards().subscribe((data : CreditCard[])=>{
      this.creditCards = this.sortCreditCardsByIdDesc(data);
      console.log(this.creditCards);
      this.dataSource = new MatTableDataSource(this.creditCards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }
  displayColumns = ["select","id","name","description","bankName","maxCredit","interestRate","active","actions"]
  dataSource = new MatTableDataSource(this.creditCards);
  selection = new SelectionModel(true,[])

  sortCreditCardsByIdDesc(cards: CreditCard[]): CreditCard[] {
    return cards.sort((a, b) => {
      const idA = a.id !== undefined ? a.id : -Infinity;
      const idB = b.id !== undefined ? b.id : -Infinity;
      return idB - idA;
    });
  }

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

    selectHandler(row: CreditCard){
      this.selection.toggle(row as never);
      
    }
}
