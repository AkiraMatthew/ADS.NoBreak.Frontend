import { Component } from '@angular/core';
import { PrimengModule } from '../../infrastructure/primeng.module';

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
}
