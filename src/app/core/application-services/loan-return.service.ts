import { Injectable } from '@angular/core';
import { Loan } from '../domain/models/loan.model';
import { firstValueFrom } from 'rxjs';
import { LoanService } from './loan.service';
import { NotificationService } from './notification.service';
import { LoadingService } from '../infrastructure/services/loading.service';

@Injectable({
    providedIn: 'root',
})
export class LoanReturnService {

    constructor(private loanService: LoanService, private notificationService: NotificationService, private loadingService: LoadingService) { }

    async returnLoans(loans: Loan[]): Promise<void> {
        this.loadingService.setLoading(true);
        const updatePromises = loans.map(async loan => {
            loan.return_date = new Date();
            try {
                await firstValueFrom(this.loanService.updateLoan(loan.id, loan));
                this.loanService.loanUpdated.emit(loan);
            } catch (error) {
                this.notificationService.showAlert('Error while returning the loan. Please try again.');
            }
        });

        await Promise.all(updatePromises);
        this.loadingService.setLoading(false);
    }
}
