import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { RoleService } from 'src/app/core/application-services/role.service';
import { Library } from 'src/app/core/domain/models/library.model';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';
import { ITableColumn } from 'src/app/shared/models/table-column-config.model';
import { LibraryListConfig } from './library-list.config';
import { Observable } from 'rxjs';
import { ViewLibraryDetailsAction } from '../strategies/view-library-details.action';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit {

  libraries: MatTableDataSource<Library> = new MatTableDataSource<Library>([]);
  displayedColumns: ITableColumn<Library>[];

  isLoading$: Observable<boolean>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private libraryService: LibraryService,
    private loadingService: LoadingService,
    private roleService: RoleService,
    private libraryListConfig: LibraryListConfig,
    private viewDetails: ViewLibraryDetailsAction
  ) {
    this.isLoading$ = this.loadingService.loading$;
    this.displayedColumns = this.libraryListConfig.getColumnsByRole(this.roleService);
  }

  ngOnInit(): void {
    this.getAllLibraries();
  }

  getAllLibraries(): void {
    this.loadingService.setLoading(true);

    this.libraryService.fetchAllLibraries().subscribe({
      next: libraries => {
        this.libraries = new MatTableDataSource(libraries);
        this.libraries.sort = this.sort;
        this.loadingService.setLoading(false);
      },
      error: error => {
        console.error('Error fetching libraries: ', error);
        this.loadingService.setLoading(false);
      }
    });

  }

  handleAction(event: { action: string, item: Library }) {
    switch (event.action) {
      case 'view':
        this.viewDetails.execute(event.item);
        break;
      case 'create':

        break;
      case 'edit':

        break;
      case 'delete':

        break;
    }
  }

}
