import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/core/application-services/category.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { Category } from 'src/app/core/domain/models/category.model';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { CategoryListConfig } from './category-list.config';
import { Observable, Subject } from 'rxjs';
import { EditCategoryAction } from '../strategies/edit-category.action';
import { DeleteCategoryAction } from '../strategies/delete-category.action';
import { EntityDataService } from 'src/app/core/application-services/entity-data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: MatTableDataSource<Category> = new MatTableDataSource<Category>([]);
  displayedColumns: ITableColumn<Category>[];

  isLoading$: Observable<boolean>;
  private loadingComplete$ = new Subject<void>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private roleService: RoleService,
    private categoryListConfig: CategoryListConfig,
    private editCategoryAction: EditCategoryAction,
    private deleteCategoryAction: DeleteCategoryAction,
    private entityDataService: EntityDataService<Category>
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.categoryListConfig.getColumnsByRole(this.roleService)
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.loadingComplete$.subscribe(() => {
      this.subscribeToDataSourceChanges();
    });
  }

  getAllCategories(): void {
    this.loadingService.setLoading(true);

    const completeLoading = () => {
      this.loadingService.setLoading(false);
      this.loadingComplete$.next();
    };

    this.categoryService.fetchAllCategories().subscribe({
      next: categories => {
        this.categories = new MatTableDataSource(categories);
        this.categories.sort = this.sort;
        this.entityDataService.setDataSource(categories);
        completeLoading();
      },
      error: error => {
        console.error('Error fetching categories: ', error);
        completeLoading();
      }

    });
  }

  subscribeToDataSourceChanges(): void {
    this.entityDataService.dataSource$.subscribe(dataSource => {
      this.categories = dataSource;
      this.categories.sort = this.sort;
    });
  }

  handleAction(event: { action: string, item: Category }) {
    switch (event.action) {
      case 'edit':
        this.editCategoryAction.execute(event.item);
        break;
      case 'delete':
        this.deleteCategoryAction.execute(event.item);
        break;
    }
  }

}
