import { Component } from '@angular/core';
import { PrimengModule } from '../../infrastructure/primeng.module';

@Component({
  selector: 'app-login',
  imports: [PrimengModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  
  onLogin() {
    console.log('Login page');
  }
}
