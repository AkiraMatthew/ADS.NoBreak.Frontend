export class MainRoutesPaths {
    public static readonly homepage: string = 'homepage';
    public static readonly loggedInRoute: string = 'app';
    public static readonly dashboard: string = 'dashboard';
    public static readonly authPages: string = 'auth';
    public static readonly notFoundPage: string = 'notfound';
    public static readonly otherPages: string = '**';
}

export class FullRoutesPaths {
    public static readonly loginPage: string = '/auth/login';
    public static readonly registerPage: string = '/auth/register';
    public static readonly dashboardPage: string = `/${MainRoutesPaths.loggedInRoute}/dashboard`;
}