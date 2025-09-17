import { PrimengModule } from '../../infrastructure/primeng.module';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  imports: [PrimengModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  onRegister(){
    console.log("working")
  }
  signIn() {
    console.log('Going to Login page');
  }
}
