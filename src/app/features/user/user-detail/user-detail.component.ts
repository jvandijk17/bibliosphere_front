import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/application-services/user.service';
import { User } from 'src/app/core/domain/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  @Input() user: User | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.userService.getUser(+id).subscribe(user => {
        this.user = user;
        this.cdr.detectChanges();
      });
    }

  }

}
