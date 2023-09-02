import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCategoryComponent } from './book-category.component';

describe('BookCategoryComponent', () => {
  let component: BookCategoryComponent;
  let fixture: ComponentFixture<BookCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookCategoryComponent]
    });
    fixture = TestBed.createComponent(BookCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
