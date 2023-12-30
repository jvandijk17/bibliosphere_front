import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreadcrumbItem } from '../models/breadcrumb-item.model';
import { RoleService } from 'src/app/core/application-services/role.service';
import { AuthService } from 'src/app/core/application-services/auth.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: BreadcrumbItem[] = [];
  action = '';
  isAdmin: boolean = false;
  isInitialized = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    public authService: AuthService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.generateBreadcrumbs(this.route.root);
      this.setActionFromRouteData(this.route.root);
      this.isAdmin = this.roleService.isAdmin;
      this.isInitialized = true;
    });
  }

  ngOnInit(): void {
    this.breadcrumbs = this.generateBreadcrumbs(this.route.root);
    this.setActionFromRouteData(this.route.root);
    this.isAdmin = this.roleService.isAdmin;
    this.isInitialized = true;
  }

  isAddOrEditRoute(): boolean {
    const currentRoute = this.router.url;
    return /\/add$|\/edit\/\d+$/.test(currentRoute);
  }


  private setActionFromRouteData(route: ActivatedRoute): void {
    while (route.firstChild) {
      route = route.firstChild;
      const actionBtn = route.snapshot.data['actionBtn'];
      if (actionBtn) {
        this.action = actionBtn;
        break;
      }
    }
  }

  private generateBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: BreadcrumbItem[] = [], routesMap: { [key: string]: boolean } = {}): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '' && !routesMap[routeURL]) {
        url += `/${routeURL}`;
        routesMap[routeURL] = true;

        const label = child.snapshot.data['breadcrumb'];
        if (label) {
          breadcrumbs.push({ label, link: url });
        }
      }

      this.generateBreadcrumbs(child, url, breadcrumbs, routesMap);
    }
    return breadcrumbs;
  }

}
