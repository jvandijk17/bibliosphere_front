import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
