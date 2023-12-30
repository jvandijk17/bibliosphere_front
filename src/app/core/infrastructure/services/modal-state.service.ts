import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalStateService {
    private modalCloseSource = new BehaviorSubject<boolean>(false);

    public modalClose$ = this.modalCloseSource.asObservable();

    closeModal() {
        this.modalCloseSource.next(true);
    }

    resetModalClose() {
        this.modalCloseSource.next(false);
    }
}
