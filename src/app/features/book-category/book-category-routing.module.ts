import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCategoryComponent } from './book-category.component';

const routes: Routes = [{ path: '', component: BookCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookCategoryRoutingModule { }
