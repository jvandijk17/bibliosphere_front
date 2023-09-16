import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { PreviousUrlService } from 'src/app/core/services/previous-url.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMsg: string = '';
    loading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private previousUrlService: PreviousUrlService
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;
            this.errorMsg = '';
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;

            this.authService.login(email, password).subscribe({
                next: () => {
                    this.loading = false;
                    const previousUrl = this.previousUrlService.getUrl() || '';

                    if (previousUrl === '/account/login' || previousUrl.length === 0) {
                        this.router.navigate(['/control-panel']);
                    } else {
                        this.router.navigate([previousUrl || '/control-panel']);
                    }

                },
                error: () => {
                    this.loading = false;
                    this.errorMsg = 'Invalid credentials';
                }
            });
        }
    }
}
