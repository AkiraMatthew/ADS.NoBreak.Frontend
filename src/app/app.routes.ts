import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { VaultComponent } from './features/password/vault/vault';
import { GeneratorComponent } from './features/password/generator/generator';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'app',
        // This will be protected by auth guard later
        children: [
            {
                path: '',
                redirectTo: 'vault',
                pathMatch: 'full'
            },
            {
                path: 'vault',
                component: VaultComponent
            },
            {
                path: 'generator',
                component: GeneratorComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
