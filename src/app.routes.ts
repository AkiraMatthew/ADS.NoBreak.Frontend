import { Routes } from '@angular/router';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';

export const routes: Routes = [
    {
        path: '',
        component: Landing
    },
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes')
    },
    {
        path: 'dashboard',
        component: Dashboard
    }
];
