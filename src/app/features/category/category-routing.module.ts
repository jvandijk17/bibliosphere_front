import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AuthGuard } from 'src/app/core/infrastructure/guards/auth.guard';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  {
    path: 'add',
    component: CategoryFormComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add Category' }
  },
  {
    path: 'edit/:id',
    component: CategoryFormComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Edit Category' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
