import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { BookFormComponent } from '../book/book-form/book-form.component';
import { AuthGuard } from 'src/app/core/infrastructure/guards/auth.guard';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  {
    path: 'add',
    component: BookFormComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add Category' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
