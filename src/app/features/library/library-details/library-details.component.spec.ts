import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryDetailsComponent } from './library-details.component';

describe('LibraryDetailsComponent', () => {
  let component: LibraryDetailsComponent;
  let fixture: ComponentFixture<LibraryDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryDetailsComponent]
    });
    fixture = TestBed.createComponent(LibraryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
