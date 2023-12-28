import { Injectable } from "@angular/core";
import { LoanActionStrategy } from "./loan-action.strategy";
import { LoadingService } from "src/app/core/infrastructure/services/loading.service";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/core/application-services/user.service";
import { UserDetailsComponent } from "../../user/user-details/user-details.component";

@Injectable({
    providedIn: 'root'
})
export class ViewUserDetailsAction implements LoanActionStrategy {

    constructor(
        private userService: UserService,
        private loadingService: LoadingService,
        private dialog: MatDialog
    ) { }

    execute(userId?: number | null): void {
        if (typeof userId === 'undefined') return;

        this.loadingService.setLoading(true);
        if (userId) {
            this.userService.getUser(userId).subscribe(user => {
                if (user) {
                    this.dialog.open(UserDetailsComponent, {
                        data: { user },
                        width: '400px',
                    });
                    this.loadingService.setLoading(false);
                }
            });
        }
    }

}