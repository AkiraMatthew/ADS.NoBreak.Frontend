import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { MainRoutesPaths } from '@/infra/routes.values';

export const appRoutes: Routes = [
    {
        path: MainRoutesPaths.loggedInRoute,
        component: AppLayout,
        children: [
            { path: MainRoutesPaths.dashboard, component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: MainRoutesPaths.homepage, component: Landing },
    { path: '', redirectTo: MainRoutesPaths.homepage, pathMatch: 'full' },
    { path: MainRoutesPaths.notFoundPage, component: Notfound },
    { path: MainRoutesPaths.authPages, loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: MainRoutesPaths.otherPages, redirectTo: '/notfound' }
];
