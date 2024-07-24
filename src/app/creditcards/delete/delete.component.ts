import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  deleteCreditCardForm!: FormGroup;

  creditCardId: number = 0;

  creditCardData: CreditCard | null = null;

  private destroy$ : Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private creditCardsService: CreditcardsService) {

      this.deleteCreditCardForm = this.formBuilder.group({
        id: [this.creditCardId],
        name: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        description: [{ value: '', disabled: true }, Validators.required],
        bankName: [{ value: '', disabled: true }, Validators.required],
        maxCredit: [{ value: '', disabled: true }, Validators.required],
        interestRate: [{ value: '', disabled: true }, Validators.required],
        active: [false, Validators.required],
        recommendedScore: [{ value:null, disabled: true }, Validators.required],
        annualFee: [{ value: '', disabled: true }, Validators.required],
        termsAndConditions:[{ value: '', disabled: true }, Validators.required],
        createdDate: [{ value: '', disabled: true }, Validators.required],
        updatedDate: [{ value: '', disabled: true }, Validators.required]
      });
  }

  ngOnInit(){
    const id = parseInt(this.route.snapshot.paramMap.get("id") || '');
    this.creditCardId = id;

    if(id !== 0){
      this.creditCardsService.getCreditCardById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.creditCardData = data;

        this.deleteCreditCardForm.patchValue(this.creditCardData);
      });
      console.log("deleteCreditCardForm")
      console.log(this.deleteCreditCardForm)

    }
  }

  onSubmit(){
    if(this.deleteCreditCardForm.valid){
      const updatedFormData: CreditCard = this.deleteCreditCardForm.value;
      
      this.creditCardsService.deleteCreditCard(this.creditCardId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(()=> {
        this.showSuccessMessage("Deleted Successfully");
      })
    }
  }

  showSuccessMessage(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000
    })
  }

  ngOnDestory(){
    this.destroy$.next();
    this.destroy$.complete();
    
  }

}