import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  columns: number = 3;

  constructor() {
    this.updateColumns(window.innerWidth);
  }

  entities = [
    { name: 'Book', path: '/book', icon: 'book' },
    { name: 'Book Category', path: '/book-category', icon: 'category' },
    { name: 'Category', path: '/category', icon: 'label' },
    { name: 'Library', path: '/library', icon: 'library_books' },
    { name: 'Loan', path: '/loan', icon: 'money' },
    { name: 'User', path: '/user', icon: 'person' }
  ];

  @HostListener('window:resize', ['$event.target.innerWidth'])
  updateColumns(innerWidth: number) {
    if (innerWidth < 400) {
      this.columns = 1;
    } else if (innerWidth < 600) {
      this.columns = 2;
    } else {
      this.columns = 3;
    }
  }

}
