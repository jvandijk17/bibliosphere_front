import { Component, Input } from '@angular/core';
import { DetailConfig } from '../models/detail-config.model';

@Component({
  selector: 'app-generic-detail',
  templateUrl: './generic-detail.component.html',
  styleUrls: ['./generic-detail.component.scss']
})
export class GenericDetailComponent {

  @Input() data: any;
  @Input() config?: DetailConfig[];

}
