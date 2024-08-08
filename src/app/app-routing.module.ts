import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
 [{ path: 'creditcards', loadChildren: () => import('./creditcards/creditcards.module').then(m => m.CreditcardsModule) },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }, 
  { path: 'customer', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }, 

  

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
