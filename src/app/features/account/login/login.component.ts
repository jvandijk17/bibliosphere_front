import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostAuthRoutingService } from 'src/app/core/services/post-auth-routing.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/components/alert/alert.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMsg: string = '';
    loading: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private postAuthRoutingService: PostAuthRoutingService,
        private dialog: MatDialog
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        if (localStorage.getItem('hasLoggedInBefore')) {
            this.dialog.open(AlertComponent, {
                data: {
                    message: 'Your session has expired. Please login again.'
                }
            });
        }
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
                    this.postAuthRoutingService.navigateAfterAuthentication();
                },
                error: (err) => {
                    this.loading = false;
                    if (err && err.status === 403) {
                        this.dialog.open(AlertComponent, {
                            data: {
                                message: 'This user is blocked. Please contact support.'
                            }
                        });
                    } else {
                        this.errorMsg = 'Invalid credentials';
                    }
                }
            });
        }
    }
}
