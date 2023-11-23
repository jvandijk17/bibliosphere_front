import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/domain/models/user.model';
import { UserListConfig } from '../user-list/user-list.config';
import { DetailConfig } from 'src/app/shared/models/detail-config.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userConfig: DetailConfig[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private userListConfig: UserListConfig
  ) {
    const columns = this.userListConfig.getColumns();
    this.userConfig = this.userListConfig.toDetailConfig(columns, this.data.user);
  }

}
