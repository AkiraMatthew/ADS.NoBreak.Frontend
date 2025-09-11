import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    SliderModule,
    CheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './generator.html',
  styleUrls: ['./generator.scss']
})
export class GeneratorComponent {
  generatorForm: FormGroup;
  generatedPassword: string = '';

  constructor(private readonly fb: FormBuilder) {
    this.generatorForm = this.fb.group({
      length: [12],
      includeUppercase: [true],
      includeLowercase: [true],
      includeNumbers: [true],
      includeSymbols: [false],
      excludeAmbiguous: [true]
    });
  }

  generatePassword() {
    const options = this.generatorForm.value;
    let charset = '';
    
    if (options.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.includeNumbers) charset += '0123456789';
    if (options.includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (options.excludeAmbiguous) {
      charset = charset.replace(/[0O1lI]/g, '');
    }

    let password = '';
    for (let i = 0; i < options.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    this.generatedPassword = password;
  }

  copyPassword() {
    if (this.generatedPassword) {
      navigator.clipboard.writeText(this.generatedPassword);
      console.log('Password copied to clipboard');
    }
  }

  onLengthChange(value: number) {
    this.generatorForm.patchValue({ length: value });
  }
}
