import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PostAuthRoutingService } from 'src/app/core/services/post-auth-routing.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMsg: string = '';
    isLoading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private postAuthRoutingService: PostAuthRoutingService,
        private loadingService: LoadingService, private dialog: MatDialog
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
        this.isLoading$ = this.loadingService.loading$;
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
            this.loadingService.setLoading(true);
            this.errorMsg = '';
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;

            this.authService.login(email, password).subscribe({
                next: () => {
                    this.loadingService.setLoading(false);
                    this.postAuthRoutingService.navigateAfterAuthentication();
                },
                error: (err) => {
                    this.loadingService.setLoading(false);
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
