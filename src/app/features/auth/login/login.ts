import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        CardModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule
    ]
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            // This will be handled by NgRx actions later
            console.log('Login attempt:', this.loginForm.value);
        }
    }

    onGoogleLogin() {
        console.log('Google login clicked');
        // Future: integrate Google OAuth
    }

    onMicrosoftLogin() {
        console.log('Microsoft login clicked');
        // Future: integrate Microsoft OAuth
    }

    onYahooLogin() {
        console.log('Yahoo login clicked');
        // Future: integrate Yahoo OAuth
    }
}
