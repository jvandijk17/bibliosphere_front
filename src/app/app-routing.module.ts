import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/account/login', pathMatch: 'full' },
  { path: 'account', loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule) },
  { path: 'book', loadChildren: () => import('./features/book/book.module').then(m => m.BookModule) },
  { path: 'book-category', loadChildren: () => import('./features/book-category/book-category.module').then(m => m.BookCategoryModule) },
  { path: 'category', loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule) },
  { path: 'library', loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule) },
  { path: 'loan', loadChildren: () => import('./features/loan/loan.module').then(m => m.LoanModule) },
  { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
