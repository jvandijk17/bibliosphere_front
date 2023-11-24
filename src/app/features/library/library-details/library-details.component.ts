import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Library } from 'src/app/core/domain/models/library.model';
import { LibraryListConfig } from '../library-list/library-list.config';
import { DetailConfig } from 'src/app/shared/models/detail-config.model';
import { RoleService } from 'src/app/core/application-services/role.service';

@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.scss']
})
export class LibraryDetailsComponent {

  libraryConfig: DetailConfig[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { library: Library },
    private libraryListConfig: LibraryListConfig,
    private roleService: RoleService
  ) {
    const columns = this.libraryListConfig.getColumnsByRole(this.roleService)
    this.libraryConfig = this.libraryListConfig.toDetailConfig(columns, this.data.library);
  }

}
