import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = 

 [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect empty path to /login
  { path: 'creditcards', loadChildren: () => import('./creditcards/creditcards.module').then(m => m.CreditcardsModule) },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }, 
  { path: 'customer', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }, 
  { path: 'login', component: LoginComponent},
  
  { path: 'page-not-found',component: PageNotFoundComponent},
  { path: 'notifications',component: NotificationsComponent}, 
  { path: '**',redirectTo: '/page-not-found'},

  

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
