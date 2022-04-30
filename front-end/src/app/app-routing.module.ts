import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.module').then(module => module.LoginModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(module => module.ProductsModule), canActivate: [ AuthGuard ] },
  { path: 'sells', loadChildren: () => import('./sells/sells.module').then(module => module.SellsModule), canActivate: [ AuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
