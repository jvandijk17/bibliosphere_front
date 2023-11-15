import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/core/application-services/category.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { Category } from 'src/app/core/domain/models/category.model';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { CategoryListConfig } from './category-list.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: MatTableDataSource<Category> = new MatTableDataSource<Category>([]);
  displayedColumns: ITableColumn<Category>[];

  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private roleService: RoleService,
    private categoryListConfig: CategoryListConfig
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.categoryListConfig.getColumnsByRole(this.roleService)
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.loadingService.setLoading(true);

    this.categoryService.fetchAllCategories().subscribe({
      next: categories => {
        this.categories = new MatTableDataSource(categories);
        this.categories.sort = this.sort;
      },
      error: error => {
        console.error('Error fetching categories: ', error);
      }

    });

    this.loadingService.setLoading(false);
  }

  handleAction(event: { action: string, item: Category }) {
    switch (event.action) {
      case 'create':

        break;
      case 'edit':

        break;
      case 'delete':

        break;
    }
  }

}
