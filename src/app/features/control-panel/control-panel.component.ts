import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

  visibleEntities: any[] = [];
  columns: number = 3;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.updateColumns(window.innerWidth);
    this.authService.fetchEntityRoles.subscribe(() => {
      this.updateVisibleEntities();
    });
  }

  entities = [
    { name: 'Book', path: '/book', icon: 'book', controllerName: 'BookController' },
    { name: 'Book Category', path: '/book-category', icon: 'category', controllerName: 'BookCategoryController' },
    { name: 'Category', path: '/category', icon: 'label', controllerName: 'CategoryController' },
    { name: 'Library', path: '/library', icon: 'library_books', controllerName: 'LibraryController' },
    { name: 'Loan', path: '/loan', icon: 'money', controllerName: 'LoanController' },
    { name: 'User List', path: '/user', icon: 'person', controllerName: 'UserController' }
  ];

  @HostListener('window:resize', ['$event.target.innerWidth'])
  updateColumns(innerWidth: number) {
    this.columns = innerWidth < 600 ? (innerWidth < 400 ? 1 : 2) : 3;
  }

  updateVisibleEntities() {
    const isAdmin = this.authService.userRoles.includes('ROLE_ADMIN');

    this.visibleEntities = this.entities.filter(entity => {
      if (isAdmin) return true;

      const rolesForEntity = this.authService.entityRoles[entity.controllerName];

      return !rolesForEntity?.index || !rolesForEntity.index.includes('ROLE_ADMIN');
    });
  }


}
