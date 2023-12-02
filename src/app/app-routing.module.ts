import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoLoginIfAuthGuard } from './core/infrastructure/guards/no-login-if-auth.guard';
import { AuthGuard } from './core/infrastructure/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/control-panel', pathMatch: 'full' },
      {
        path: 'book',
        loadChildren: () => import('./features/book/book.module').then(m => m.BookModule),
        data: { breadcrumb: 'Book List' }
      },
      { path: 'category', loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule) },
      { path: 'library', loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule) },
      { path: 'loan', loadChildren: () => import('./features/loan/loan.module').then(m => m.LoanModule) },
      { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
      { path: 'control-panel', loadChildren: () => import('./features/control-panel/control-panel.module').then(m => m.ControlPanelModule) },
    ]
  },
  { path: '', redirectTo: '/account/login', pathMatch: 'full' },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivateChild: [NoLoginIfAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
