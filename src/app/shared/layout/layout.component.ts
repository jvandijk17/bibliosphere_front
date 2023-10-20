import { Component } from '@angular/core';
import { LoadingService } from 'src/app/core/infrastructure/services/loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(public loadingService: LoadingService) { }
}
