import { Routes } from '@angular/router';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes')
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];
