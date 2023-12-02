import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/infrastructure/guards/auth.guard';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';

const routes: Routes = [
  {
    path: '', component: BookListComponent
  },
  {
    path: 'add',
    component: BookFormComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add Book' }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
