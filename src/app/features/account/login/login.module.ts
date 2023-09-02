import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        ReactiveFormsModule
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }
