import { Injectable } from "@angular/core";
import { LoanActionStrategy } from "./loan-action.strategy";
import { LoanService } from "src/app/core/application-services/loan.service";
import { LoadingService } from "src/app/core/infrastructure/services/loading.service";
import { LoanDetailModalComponent } from "../loan-detail-modal/loan-detail-modal.component";
import { MatDialog } from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export class ViewLoanDetailsAction implements LoanActionStrategy {

    constructor(
        private loanService: LoanService,
        private loadingService: LoadingService,
        private dialog: MatDialog
    ) { }

    execute(loanId?: number | null): void {
        if (typeof loanId === 'undefined') return;

        this.loadingService.setLoading(true);
        if (loanId) {
            this.loanService.getLoan(loanId).subscribe(loan => {
                if (loan) {
                    this.dialog.open(LoanDetailModalComponent, {
                        data: { loan },
                        width: '400px',
                    });
                    this.loadingService.setLoading(false);
                }
            });
        }
    }

}