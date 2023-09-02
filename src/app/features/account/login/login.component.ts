import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMsg: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;

            this.authService.login(email, password).subscribe(
                () => { },
                () => {
                    this.errorMsg = 'Invalid credentials';
                }
            );
        }
    }
}
