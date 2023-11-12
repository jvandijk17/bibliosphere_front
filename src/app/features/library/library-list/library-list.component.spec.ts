import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryListComponent } from './library-list.component';

describe('LibraryListComponent', () => {
  let component: LibraryListComponent;
  let fixture: ComponentFixture<LibraryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryListComponent]
    });
    fixture = TestBed.createComponent(LibraryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
