import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDetailComponent } from './generic-detail.component';

describe('GenericDetailComponent', () => {
  let component: GenericDetailComponent;
  let fixture: ComponentFixture<GenericDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericDetailComponent]
    });
    fixture = TestBed.createComponent(GenericDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
