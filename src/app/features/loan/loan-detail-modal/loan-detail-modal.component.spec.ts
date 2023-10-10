import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailModalComponent } from './loan-detail-modal.component';

describe('LoanDetailModalComponent', () => {
  let component: LoanDetailModalComponent;
  let fixture: ComponentFixture<LoanDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanDetailModalComponent]
    });
    fixture = TestBed.createComponent(LoanDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
