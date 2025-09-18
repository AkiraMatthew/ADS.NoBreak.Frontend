import { RouterLink } from '@angular/router';
import { PrimengModule } from '../../infrastructure/primeng.module';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  imports: [PrimengModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  onRegister(){
    console.log("Registering...")
  }
}
