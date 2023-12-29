import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryListComponent } from './library-list/library-list.component';
import { LibraryFormComponent } from './library-form/library-form.component';
import { AuthGuard } from 'src/app/core/infrastructure/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LibraryListComponent },
  {
    path: 'add',
    component: LibraryFormComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Add Library' }
  },
  {
    path: 'edit/:id',
    component: LibraryFormComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Edit Library' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
