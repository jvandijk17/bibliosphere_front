import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/application-services/auth.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

  visibleEntities: any[] = [];
  columns: number = 3;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    this.loadingService.setLoading(true);
    this.updateColumns(window.innerWidth);
    this.authService.fetchEntityRoles.subscribe(() => {
      this.updateVisibleEntities();
      this.loadingService.setLoading(false);
    });
  }

  entities = [
    { name: 'Book', path: '/book', icon: 'book', controllerName: 'BookController' },
    { name: 'Category', path: '/category', icon: 'label', controllerName: 'CategoryController' },
    { name: 'Library', path: '/library', icon: 'library_books', controllerName: 'LibraryController' },
    { name: 'Loan History', path: '/loan', icon: 'money', controllerName: 'LoanController' },
    { name: 'User List', path: '/user', icon: 'person', controllerName: 'UserController' }
  ];

  @HostListener('window:resize', ['$event.target.innerWidth'])
  updateColumns(innerWidth: number) {
    this.columns = innerWidth < 600 ? (innerWidth < 400 ? 1 : 2) : 3;
  }

  updateVisibleEntities() {

    this.visibleEntities = this.entities.filter(entity => {
      if (this.roleService.isAdmin) return true;

      const rolesForEntity = this.authService.entityRoles[entity.controllerName];

      return !rolesForEntity?.index || !rolesForEntity.index.includes('ROLE_ADMIN');
    });
  }


}
