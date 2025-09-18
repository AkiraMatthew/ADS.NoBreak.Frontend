import { Component } from '@angular/core';
import { PrimengModule } from '../../infrastructure/primeng.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [PrimengModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

}
