import { PrimengModule } from '../../infrastructure/primeng.module';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [PrimengModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  
  onLogin() {
    console.log('Logging in');
  }
}
