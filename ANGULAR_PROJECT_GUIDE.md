# Angular 20 + PrimeNG + PrimeFlex Project Guide

## Building a Complete Authentication System with Modern Angular

This comprehensive guide will walk you through creating a modern Angular 20 application with PrimeNG components and PrimeFlex utilities, focusing on building a complete authentication system with login and registration functionality.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites & Environment Setup](#prerequisites--environment-setup)
3. [Project Initialization](#project-initialization)
4. [Understanding Angular Fundamentals](#understanding-angular-fundamentals)
5. [Setting Up PrimeNG & PrimeFlex](#setting-up-primeng--primeflex)
6. [Authentication System Architecture](#authentication-system-architecture)
7. [Building the Login Component](#building-the-login-component)
8. [Creating the Registration Component](#creating-the-registration-component)
9. [Implementing Routing & Navigation](#implementing-routing--navigation)
10. [Creating the Dashboard Page](#creating-the-dashboard-page)
11. [Styling & Theming](#styling--theming)
12. [Best Practices & Security](#best-practices--security)
13. [Troubleshooting & Common Issues](#troubleshooting--common-issues)

---

## Project Overview

### What We'll Build
- **Login Page**: Secure authentication with form validation
- **Registration Page**: User registration with comprehensive validation
- **Dashboard**: Simple authenticated home page
- **Routing**: Protected routes with authentication guards
- **Modern UI**: Responsive design using PrimeNG components and PrimeFlex utilities

### Technology Stack
- **Angular 20**: Latest Angular framework with modern features
- **PrimeNG**: Rich UI component library
- **PrimeFlex**: CSS utility library for responsive design
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming for state management

---

## Prerequisites & Environment Setup

### Required Software
1. **Node.js** (v18.19.0 or higher)
2. **npm** (v10.2.0 or higher)
3. **Angular CLI** (v20.x)
4. **VS Code** (recommended IDE)

### Installation Commands
```bash
# Install Node.js (Download from nodejs.org)
# Verify installation
node --version
npm --version

# Install Angular CLI globally
npm install -g @angular/cli@20

# Verify Angular CLI installation
ng version
```

---

## Project Initialization

### Step 1: Create New Angular Project

```bash
# Create new Angular project
ng new my-auth-app --routing --style=scss --skip-git

# Navigate to project directory
cd my-auth-app

# Start development server
ng serve
```

**Angular Concept Explained: Project Structure**
- `src/app/`: Contains your application code
- `src/assets/`: Static files (images, fonts, etc.)
- `src/environments/`: Environment-specific configurations
- `angular.json`: Angular workspace configuration
- `package.json`: Project dependencies and scripts

### Step 2: Install Dependencies

```bash
# Install PrimeNG and PrimeFlex
npm install primeng primeicons primeflex

# Install additional dependencies for forms and animations
npm install @angular/animations
```

---

## Understanding Angular Fundamentals

Before diving into the implementation, let's understand the core Angular concepts we'll be using:

### 1. Components
**What are Components?**
Components are the basic building blocks of Angular applications. They control a patch of screen called a view.

```typescript
// Example component structure
@Component({
  selector: 'app-login',           // HTML tag name
  templateUrl: './login.component.html',  // HTML template
  styleUrls: ['./login.component.scss']   // Component styles
})
export class LoginComponent {
  // Component logic goes here
}
```

**Key Concepts:**
- **Selector**: How the component is used in HTML
- **Template**: The HTML view
- **Styles**: Component-specific CSS/SCSS
- **Lifecycle Hooks**: Methods that run at specific times (ngOnInit, ngOnDestroy)

### 2. Services
**What are Services?**
Services are classes that handle business logic, data access, and other shared functionality.

```typescript
// Example service
@Injectable({
  providedIn: 'root'  // Makes it available app-wide
})
export class AuthService {
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginCredentials) {
    // Login logic
  }
}
```

**Key Concepts:**
- **Dependency Injection**: How Angular provides services to components
- **Singleton Pattern**: Services are typically single instances
- **Separation of Concerns**: Services handle data, components handle UI

### 3. Reactive Forms
**What are Reactive Forms?**
A way to handle form inputs and validation in a reactive, immutable way.

```typescript
// Example reactive form
this.loginForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
```

**Key Concepts:**
- **FormBuilder**: Service to create form controls
- **Validators**: Built-in and custom validation rules
- **FormControl**: Represents a single input field
- **FormGroup**: Represents a form with multiple controls

### 4. Routing
**What is Routing?**
Angular's router enables navigation from one view to another.

```typescript
// Example routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];
```

**Key Concepts:**
- **Routes**: Configuration mapping paths to components
- **Router**: Service for programmatic navigation
- **Guards**: Control access to routes
- **Route Parameters**: Pass data through URLs

---

## Setting Up PrimeNG & PrimeFlex

### Step 1: Configure PrimeNG

Add PrimeNG styles to your `angular.json`:

```json
{
  "styles": [
    "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeflex/primeflex.css",
    "src/styles.scss"
  ]
}
```

### Step 2: Import Required Modules

Create `src/app/shared/primeng.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    ToastModule,
    MessagesModule,
    ProgressSpinnerModule
  ]
})
export class PrimeNGModule { }
```

**PrimeNG Concept Explained:**
- **Modular Architecture**: Import only the components you need
- **Consistent API**: All PrimeNG components follow similar patterns
- **Theming**: Easy to change entire app appearance
- **Accessibility**: Built-in accessibility features

---

## Authentication System Architecture

### Overview of Our Authentication System

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Login Page    │───▶│  Auth Service   │───▶│   Dashboard     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       ▲
         ▼                       ▼                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Registration    │    │  Route Guards   │    │  Protected      │
│     Page        │    │                 │    │    Routes       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Components We'll Create

1. **AuthService**: Handles login/registration logic
2. **AuthGuard**: Protects routes that require authentication
3. **LoginComponent**: User login interface
4. **RegisterComponent**: User registration interface
5. **DashboardComponent**: Protected home page

### State Management Strategy

We'll implement a comprehensive RxJS-based state management approach:
- **Reactive State**: Use BehaviorSubject and observables for reactive state updates
- **Immutable Updates**: Ensure state immutability using RxJS operators
- **Centralized Store**: Create a centralized state service pattern
- **Side Effects**: Handle API calls and persistence as side effects
- **Error Handling**: Implement robust error handling with RxJS
- **Performance**: Use RxJS operators for efficient state updates and caching

---

## Building the Login Component

### Step 1: Generate the Login Component

```bash
ng generate component components/login
```

**Angular CLI Explained:**
- `ng generate` (or `ng g`): Creates new Angular elements
- `component`: Type of element to create
- `components/login`: Path and name of the component

### Step 2: Create the Authentication Service

```bash
ng generate service services/auth
```

Let's implement the authentication service:

```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';
import { 
  map, 
  tap, 
  catchError, 
  switchMap, 
  retry, 
  shareReplay, 
  distinctUntilChanged,
  filter,
  startWith
} from 'rxjs/operators';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // State Management with RxJS
  private readonly initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
  };

  private readonly stateSubject = new BehaviorSubject<AuthState>(this.initialState);
  
  // Public observables with specific selectors
  public readonly state$ = this.stateSubject.asObservable();
  public readonly user$ = this.state$.pipe(
    map(state => state.user),
    distinctUntilChanged()
  );
  public readonly isLoading$ = this.state$.pipe(
    map(state => state.isLoading),
    distinctUntilChanged()
  );
  public readonly error$ = this.state$.pipe(
    map(state => state.error),
    distinctUntilChanged(),
    filter(error => error !== null)
  );
  public readonly isAuthenticated$ = this.state$.pipe(
    map(state => state.isAuthenticated),
    distinctUntilChanged()
  );

  // Notification system using RxJS
  private readonly notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  public readonly notifications$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    // Check stored authentication state on service initialization
    const storedUser = this.getStoredUser();
    if (storedUser) {
      this.updateState({
        user: storedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    }
  }

  private getStoredUser(): User | null {
    try {
      const stored = localStorage.getItem('currentUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private updateState(partialState: Partial<AuthState>): void {
    const currentState = this.stateSubject.value;
    const newState = { ...currentState, ...partialState };
    this.stateSubject.next(newState);
  }

  private addNotification(notification: Omit<AppNotification, 'id' | 'timestamp'>): void {
    const newNotification: AppNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, newNotification]);

    // Auto-remove notification after 5 seconds
    timer(5000).subscribe(() => {
      this.removeNotification(newNotification.id);
    });
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }

  login(credentials: LoginCredentials): Observable<User> {
    // Set loading state
    this.updateState({ isLoading: true, error: null });

    return this.simulateApiCall(credentials).pipe(
      retry(2), // Retry failed requests twice
      tap(user => {
        // Update state on successful login
        this.updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        // Persist user data
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Add success notification
        this.addNotification({
          message: `Welcome back, ${user.firstName}!`,
          type: 'success'
        });
      }),
      catchError(error => {
        // Update state on error
        this.updateState({
          isLoading: false,
          error: error.message || 'Login failed'
        });
        
        // Add error notification
        this.addNotification({
          message: error.message || 'Login failed',
          type: 'error'
        });
        
        return throwError(() => error);
      }),
      shareReplay(1) // Cache the result
    );
  }

  register(userData: RegisterData): Observable<User> {
    this.updateState({ isLoading: true, error: null });

    return this.simulateRegistration(userData).pipe(
      retry(2),
      tap(user => {
        this.updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        this.addNotification({
          message: `Welcome to our platform, ${user.firstName}!`,
          type: 'success'
        });
      }),
      catchError(error => {
        this.updateState({
          isLoading: false,
          error: error.message || 'Registration failed'
        });
        
        this.addNotification({
          message: error.message || 'Registration failed',
          type: 'error'
        });
        
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  logout(): Observable<void> {
    this.updateState({ isLoading: true });

    // Simulate logout API call
    return of(null).pipe(
      switchMap(() => {
        // Clear state
        this.updateState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
        
        // Clear storage
        localStorage.removeItem('currentUser');
        
        // Add notification
        this.addNotification({
          message: 'You have been successfully logged out',
          type: 'info'
        });

        return of(undefined);
      })
    );
  }

  // Method to check if user is authenticated (synchronous)
  isAuthenticated(): boolean {
    return this.stateSubject.value.isAuthenticated;
  }

  // Method to get current user (synchronous)
  getCurrentUser(): User | null {
    return this.stateSubject.value.user;
  }

  // Clear error state
  clearError(): void {
    this.updateState({ error: null });
  }

  // Refresh user data
  refreshUser(): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('No authenticated user'));
    }

    this.updateState({ isLoading: true });

    // Simulate refresh API call
    return this.simulateUserRefresh(currentUser.id).pipe(
      tap(user => {
        this.updateState({
          user,
          isLoading: false,
          error: null
        });
        localStorage.setItem('currentUser', JSON.stringify(user));
      }),
      catchError(error => {
        this.updateState({
          isLoading: false,
          error: error.message || 'Failed to refresh user data'
        });
        return throwError(() => error);
      })
    );
  }

  // Simulate API calls with realistic behavior
  private simulateApiCall(credentials: LoginCredentials): Observable<User> {
    return timer(1500).pipe( // Simulate network delay
      switchMap(() => {
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          return of({
            id: '1',
            email: credentials.email,
            firstName: 'John',
            lastName: 'Doe'
          });
        }
        return throwError(() => new Error('Invalid email or password'));
      })
    );
  }

  private simulateRegistration(userData: RegisterData): Observable<User> {
    return timer(2000).pipe(
      switchMap(() => {
        // Simulate email already exists check
        if (userData.email === 'existing@example.com') {
          return throwError(() => new Error('Email already exists'));
        }
        
        return of({
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName
        });
      })
    );
  }

  private simulateUserRefresh(userId: string): Observable<User> {
    return timer(1000).pipe(
      switchMap(() => {
        return of({
          id: userId,
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe'
        });
      })
    );
  }
}
```

**Service Concepts Explained:**

1. **BehaviorSubject**: A special type of Observable that:
   - Stores the current value
   - Emits the current value to new subscribers immediately
   - Perfect for maintaining authentication state

2. **Dependency Injection**: The `@Injectable` decorator makes this service available for injection into components

3. **RxJS Operators**:
   - `tap`: Performs side effects (like storing data)
   - `map`: Transforms the data
   - `catchError`: Handles errors

---

## Advanced RxJS State Management Patterns

### Understanding the RxJS-Based State Architecture

Our enhanced authentication service demonstrates several advanced RxJS patterns that provide robust state management:

#### 1. **Centralized State Pattern**

```typescript
// State interface defines the shape of our application state
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Single source of truth using BehaviorSubject
private readonly stateSubject = new BehaviorSubject<AuthState>(initialState);
```

**Key Benefits:**
- **Predictable Updates**: All state changes go through a single point
- **Immutability**: State updates create new state objects
- **Time Travel**: Easy to implement undo/redo functionality
- **Debugging**: Clear audit trail of state changes

#### 2. **Selector Pattern**

```typescript
// Derived observables that select specific pieces of state
public readonly user$ = this.state$.pipe(
  map(state => state.user),
  distinctUntilChanged()  // Only emit when user actually changes
);

public readonly isLoading$ = this.state$.pipe(
  map(state => state.isLoading),
  distinctUntilChanged()
);
```

**Key Benefits:**
- **Performance**: Components only re-render when relevant data changes
- **Composition**: Easy to combine multiple selectors
- **Memoization**: `distinctUntilChanged` prevents unnecessary updates

#### 3. **Side Effects Management**

```typescript
login(credentials: LoginCredentials): Observable<User> {
  // Update loading state immediately
  this.updateState({ isLoading: true, error: null });

  return this.simulateApiCall(credentials).pipe(
    retry(2), // Automatically retry failed requests
    tap(user => {
      // Side effect: Update state on success
      this.updateState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      // Side effect: Persist to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Side effect: Show notification
      this.addNotification({
        message: `Welcome back, ${user.firstName}!`,
        type: 'success'
      });
    }),
    catchError(error => {
      // Side effect: Update error state
      this.updateState({
        isLoading: false,
        error: error.message
      });
      
      return throwError(() => error);
    }),
    shareReplay(1) // Cache the result for multiple subscribers
  );
}
```

**Key Benefits:**
- **Separation of Concerns**: Business logic separated from UI logic
- **Testability**: Easy to test side effects in isolation
- **Reusability**: Side effects can be composed and reused

#### 4. **Error Handling Strategy**

```typescript
// Centralized error handling with retry logic
catchError(error => {
  this.updateState({
    isLoading: false,
    error: error.message || 'Operation failed'
  });
  
  this.addNotification({
    message: error.message,
    type: 'error'
  });
  
  return throwError(() => error);
})
```

**Key Benefits:**
- **Resilience**: Automatic retry for transient failures
- **User Experience**: Consistent error messaging
- **Debugging**: Centralized error logging

#### 5. **Notification System with RxJS**

```typescript
// Reactive notification system
private readonly notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
public readonly notifications$ = this.notificationsSubject.asObservable();

private addNotification(notification: Omit<AppNotification, 'id' | 'timestamp'>): void {
  const newNotification: AppNotification = {
    ...notification,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date()
  };
  
  const currentNotifications = this.notificationsSubject.value;
  this.notificationsSubject.next([...currentNotifications, newNotification]);

  // Auto-remove notification after 5 seconds
  timer(5000).subscribe(() => {
    this.removeNotification(newNotification.id);
  });
}
```

**Key Benefits:**
- **Reactive UI**: Notifications automatically appear/disappear
- **Memory Management**: Auto-cleanup prevents memory leaks
- **Flexibility**: Easy to add different notification types

#### 6. **Performance Optimization Patterns**

```typescript
// Memoization with shareReplay
return this.apiCall().pipe(
  shareReplay(1) // Cache result for multiple subscribers
);

// Distinct updates to prevent unnecessary renders
public readonly user$ = this.state$.pipe(
  map(state => state.user),
  distinctUntilChanged() // Only emit when value actually changes
);

// Debouncing for search or input validation
searchQuery$.pipe(
  debounceTime(300), // Wait 300ms after user stops typing
  distinctUntilChanged(),
  switchMap(query => this.searchService.search(query))
);
```

#### 7. **Testing RxJS-Based Services**

```typescript
// Example test for the authentication service
describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: spy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should update state on successful login', (done) => {
    const mockUser = { id: '1', email: 'test@test.com', firstName: 'Test', lastName: 'User' };
    
    service.login({ email: 'test@test.com', password: 'password' })
      .subscribe(user => {
        expect(user).toEqual(mockUser);
        
        // Test state updates
        service.user$.subscribe(currentUser => {
          expect(currentUser).toEqual(mockUser);
          done();
        });
      });
  });

  it('should handle login errors gracefully', (done) => {
    service.login({ email: 'invalid', password: 'invalid' })
      .subscribe({
        error: (error) => {
          // Test error state
          service.error$.subscribe(errorMessage => {
            expect(errorMessage).toBeTruthy();
            done();
          });
        }
      });
  });
});
```

### RxJS Best Practices for State Management

1. **Always Unsubscribe**: Use `takeUntil` pattern to prevent memory leaks
2. **Immutable Updates**: Never mutate state directly, always create new objects
3. **Single Responsibility**: Each observable should have a single, clear purpose
4. **Error Boundaries**: Always handle errors at the appropriate level
5. **Type Safety**: Use TypeScript interfaces for all state shapes
6. **Testability**: Design observables to be easily testable

### When to Use Different RxJS Operators

- **`map`**: Transform data shape
- **`filter`**: Remove unwanted emissions
- **`tap`**: Side effects without changing the data
- **`switchMap`**: Cancel previous requests (good for search)
- **`mergeMap`**: Handle multiple concurrent requests
- **`catchError`**: Handle errors gracefully
- **`retry`**: Automatically retry failed operations
- **`debounceTime`**: Limit frequency of emissions
- **`distinctUntilChanged`**: Prevent duplicate emissions
- **`shareReplay`**: Cache and share results

---

### Step 3: Implement the Login Component with RxJS

```typescript
// src/app/components/login/login.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { AuthService, LoginCredentials } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  private destroy$ = new Subject<void>();

  // Reactive properties using observables
  isLoading$ = this.authService.isLoading$;
  error$ = this.authService.error$;
  
  // Combined observable for form validation state
  isFormValid$ = combineLatest([
    this.isLoading$,
    // We'll add form validity observable after form initialization
  ]).pipe(
    map(([isLoading]) => !isLoading)
  );

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupReactiveSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Update form validity observable
    this.isFormValid$ = combineLatest([
      this.isLoading$,
      this.loginForm.statusChanges.pipe(startWith(this.loginForm.status))
    ]).pipe(
      map(([isLoading, formStatus]) => !isLoading && formStatus === 'VALID')
    );
  }

  private setupReactiveSubscriptions(): void {
    // Listen to authentication state changes
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        }
      });

    // Listen to error state and show messages
    this.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        if (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: error
          });
          // Clear error after showing
          setTimeout(() => this.authService.clearError(), 3000);
        }
      });

    // Listen to notifications from the auth service
    this.authService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        notifications.forEach(notification => {
          this.messageService.add({
            severity: notification.type === 'error' ? 'error' : 
                     notification.type === 'success' ? 'success' : 
                     notification.type === 'warning' ? 'warn' : 'info',
            summary: notification.type.charAt(0).toUpperCase() + notification.type.slice(1),
            detail: notification.message
          });
        });
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;

      this.authService.login(credentials)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user) => {
            // Success handling is now managed by the service
            // Component just needs to handle navigation, which is done in setupReactiveSubscriptions
          },
          error: (error) => {
            // Error handling is managed by the service
            // Component can add additional UI-specific error handling here if needed
            console.error('Login error:', error);
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Reactive method to clear errors
  clearError(): void {
    this.authService.clearError();
  }
}
```

**Component Concepts Explained:**

1. **Reactive Forms**: We use FormBuilder to create a form with validation
2. **Lifecycle Hooks**: `ngOnInit` runs after component initialization
3. **Dependency Injection**: Services are injected through the constructor
4. **Error Handling**: We handle both validation errors and API errors
5. **Type Safety**: Using TypeScript interfaces for type checking

### Step 4: Create the Reactive Login Template

```html
<!-- src/app/components/login/login.component.html -->
<div class="flex align-items-center justify-content-center min-h-screen surface-50">
  <div class="w-full md:w-6 lg:w-4">
    <p-card>
      <ng-template pTemplate="header">
        <div class="text-center p-4">
          <h2 class="text-primary font-bold text-3xl mb-2">Welcome Back</h2>
          <p class="text-color-secondary">Sign in to your account</p>
        </div>
      </ng-template>

      <ng-template pTemplate="content">
        <!-- Error Display with RxJS -->
        <div *ngIf="error$ | async as error" class="p-4">
          <p-message 
            severity="error" 
            [text]="error"
            [closable]="true"
            (onClose)="clearError()"
          ></p-message>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="p-4">
          <!-- Email Field -->
          <div class="field mb-4">
            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <input 
              pInputText 
              id="email" 
              type="email" 
              formControlName="email"
              placeholder="Enter your email"
              class="w-full"
              [class.ng-invalid]="isFieldInvalid('email')"
              [disabled]="isLoading$ | async"
            />
            <small 
              class="p-error block mt-1" 
              *ngIf="isFieldInvalid('email')"
            >
              {{ getFieldError('email') }}
            </small>
          </div>

          <!-- Password Field -->
          <div class="field mb-4">
            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <p-password 
              id="password"
              formControlName="password"
              placeholder="Enter your password"
              styleClass="w-full"
              inputStyleClass="w-full"
              [feedback]="false"
              [toggleMask]="true"
              [class.ng-invalid]="isFieldInvalid('password')"
              [disabled]="isLoading$ | async"
            ></p-password>
            <small 
              class="p-error block mt-1" 
              *ngIf="isFieldInvalid('password')"
            >
              {{ getFieldError('password') }}
            </small>
          </div>

          <!-- Login Button with reactive state -->
          <button 
            pButton 
            pRipple 
            type="submit" 
            label="Sign In" 
            class="w-full mb-3"
            [loading]="isLoading$ | async"
            [disabled]="!(isFormValid$ | async)"
          ></button>

          <!-- Register Link -->
          <div class="text-center">
            <span class="text-color-secondary">Don't have an account? </span>
            <a 
              class="text-primary cursor-pointer font-medium"
              (click)="navigateToRegister()"
              [style.pointer-events]="(isLoading$ | async) ? 'none' : 'auto'"
            >
              Create one
            </a>
          </div>
        </form>
      </ng-template>
    </p-card>

    <!-- Toast for messages (now managed by service notifications) -->
    <p-toast></p-toast>
  </div>
</div>
```

**Enhanced Template Concepts Explained:**

1. **Async Pipe**: 
   - `isLoading$ | async`: Automatically subscribes and unsubscribes
   - Prevents memory leaks and reduces boilerplate code

2. **Reactive Disabling**:
   - Form inputs disabled during loading state
   - Submit button disabled when form is invalid or loading

3. **Error Handling**:
   - `error$ | async as error`: Uses alias for error display
   - Dismissible error messages with reactive clear functionality

4. **Loading States**:
   - Button shows loading spinner when operation is in progress
   - Navigation disabled during loading to prevent user confusion

### Step 5: Style the Login Component

```scss
// src/app/components/login/login.component.scss
:host {
  .p-card {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    border: none;

    .p-card-header {
      border-bottom: 1px solid var(--surface-border);
    }

    .p-card-content {
      padding: 0;
    }
  }

  .field {
    .p-inputtext,
    .p-password {
      transition: all 0.3s ease;

      &:focus {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.3);
      }
    }
  }

  .p-button {
    height: 3rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.4);
    }
  }

  .text-primary {
    &:hover {
      text-decoration: underline;
    }
  }
}
```

**SCSS Concepts Explained:**

1. **:host**: Targets the component's host element
2. **CSS Custom Properties**: Using PrimeNG's CSS variables for theming
3. **Transitions**: Smooth animations for better UX
4. **Box Shadow**: Modern depth effects

---

## Creating the Registration Component

### Step 1: Generate the Registration Component

```bash
ng generate component components/register
```

### Step 2: Implement the Registration Component

```typescript
// src/app/components/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService, RegisterData } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator for password strength
  private passwordStrengthValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    
    if (!valid) {
      return { 
        passwordStrength: {
          hasNumber,
          hasUpper, 
          hasLower,
          hasSpecial
        }
      };
    }

    return null;
  }

  // Custom validator for password confirmation
  private passwordMatchValidator(form: AbstractControl): {[key: string]: any} | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Remove passwordMismatch error if passwords match
      if (confirmPassword.errors) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const userData: RegisterData = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (user) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful! Welcome aboard!'
          });
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Registration failed'
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['passwordStrength']) {
        return 'Password must contain uppercase, lowercase, number, and special character';
      }
      if (field.errors['passwordMismatch']) return 'Passwords do not match';
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: {[key: string]: string} = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password'
    };
    return displayNames[fieldName] || fieldName;
  }

  getPasswordStrengthClass(): string {
    const password = this.registerForm.get('password')?.value;
    if (!password) return '';

    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const score = [hasNumber, hasUpper, hasLower, hasSpecial].filter(Boolean).length;

    if (score <= 1) return 'weak';
    if (score <= 2) return 'medium';
    if (score <= 3) return 'good';
    return 'strong';
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
```

**Advanced Angular Concepts Explained:**

1. **Custom Validators**: 
   - `passwordStrengthValidator`: Checks for complex password requirements
   - `passwordMatchValidator`: Ensures password confirmation matches

2. **Form-Level Validators**: Applied to the entire FormGroup to validate across fields

3. **Dynamic Error Handling**: Smart error messages based on validation failures

4. **Password Strength Indicator**: Real-time visual feedback for password quality

### Step 3: Create the Registration Template

```html
<!-- src/app/components/register/register.component.html -->
<div class="flex align-items-center justify-content-center min-h-screen surface-50 py-4">
  <div class="w-full md:w-8 lg:w-6 xl:w-4">
    <p-card>
      <ng-template pTemplate="header">
        <div class="text-center p-4">
          <h2 class="text-primary font-bold text-3xl mb-2">Create Account</h2>
          <p class="text-color-secondary">Join us today and get started</p>
        </div>
      </ng-template>

      <ng-template pTemplate="content">
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="p-4">
          <!-- Name Fields Row -->
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="firstName" class="block text-900 font-medium mb-2">First Name</label>
                <input 
                  pInputText 
                  id="firstName" 
                  type="text" 
                  formControlName="firstName"
                  placeholder="Enter your first name"
                  class="w-full"
                  [class.ng-invalid]="isFieldInvalid('firstName')"
                />
                <small 
                  class="p-error block mt-1" 
                  *ngIf="isFieldInvalid('firstName')"
                >
                  {{ getFieldError('firstName') }}
                </small>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="field">
                <label for="lastName" class="block text-900 font-medium mb-2">Last Name</label>
                <input 
                  pInputText 
                  id="lastName" 
                  type="text" 
                  formControlName="lastName"
                  placeholder="Enter your last name"
                  class="w-full"
                  [class.ng-invalid]="isFieldInvalid('lastName')"
                />
                <small 
                  class="p-error block mt-1" 
                  *ngIf="isFieldInvalid('lastName')"
                >
                  {{ getFieldError('lastName') }}
                </small>
              </div>
            </div>
          </div>

          <!-- Email Field -->
          <div class="field mb-4">
            <label for="email" class="block text-900 font-medium mb-2">Email Address</label>
            <input 
              pInputText 
              id="email" 
              type="email" 
              formControlName="email"
              placeholder="Enter your email address"
              class="w-full"
              [class.ng-invalid]="isFieldInvalid('email')"
            />
            <small 
              class="p-error block mt-1" 
              *ngIf="isFieldInvalid('email')"
            >
              {{ getFieldError('email') }}
            </small>
          </div>

          <!-- Password Field -->
          <div class="field mb-4">
            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <p-password 
              id="password"
              formControlName="password"
              placeholder="Create a strong password"
              styleClass="w-full"
              inputStyleClass="w-full"
              [feedback]="true"
              [toggleMask]="true"
              [class.ng-invalid]="isFieldInvalid('password')"
            ></p-password>
            
            <!-- Password Strength Indicator -->
            <div class="password-strength mt-2" *ngIf="registerForm.get('password')?.value">
              <div class="strength-bar">
                <div class="strength-fill" [ngClass]="getPasswordStrengthClass()"></div>
              </div>
              <small class="strength-text" [ngClass]="getPasswordStrengthClass()">
                Password strength: {{ getPasswordStrengthClass() }}
              </small>
            </div>

            <small 
              class="p-error block mt-1" 
              *ngIf="isFieldInvalid('password')"
            >
              {{ getFieldError('password') }}
            </small>
          </div>

          <!-- Confirm Password Field -->
          <div class="field mb-4">
            <label for="confirmPassword" class="block text-900 font-medium mb-2">Confirm Password</label>
            <p-password 
              id="confirmPassword"
              formControlName="confirmPassword"
              placeholder="Confirm your password"
              styleClass="w-full"
              inputStyleClass="w-full"
              [feedback]="false"
              [toggleMask]="true"
              [class.ng-invalid]="isFieldInvalid('confirmPassword')"
            ></p-password>
            <small 
              class="p-error block mt-1" 
              *ngIf="isFieldInvalid('confirmPassword')"
            >
              {{ getFieldError('confirmPassword') }}
            </small>
          </div>

          <!-- Register Button -->
          <button 
            pButton 
            pRipple 
            type="submit" 
            label="Create Account" 
            class="w-full mb-3"
            [loading]="loading"
            [disabled]="loading"
          ></button>

          <!-- Login Link -->
          <div class="text-center">
            <span class="text-color-secondary">Already have an account? </span>
            <a 
              class="text-primary cursor-pointer font-medium"
              (click)="navigateToLogin()"
            >
              Sign in
            </a>
          </div>
        </form>
      </ng-template>
    </p-card>

    <!-- Toast for messages -->
    <p-toast></p-toast>
  </div>
</div>
```

**Template Concepts Explained:**

1. **PrimeFlex Grid System**:
   - `grid`: CSS Grid container
   - `col-12 md:col-6`: Responsive columns (full width on mobile, half on desktop)

2. **Conditional Styling**: `[ngClass]` for dynamic CSS classes based on component state

3. **Password Feedback**: PrimeNG's built-in password strength indicator

### Step 4: Style the Registration Component

```scss
// src/app/components/register/register.component.scss
:host {
  .p-card {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    border: none;

    .p-card-header {
      border-bottom: 1px solid var(--surface-border);
    }

    .p-card-content {
      padding: 0;
    }
  }

  .field {
    .p-inputtext,
    .p-password {
      transition: all 0.3s ease;

      &:focus {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.3);
      }
    }
  }

  .password-strength {
    .strength-bar {
      height: 4px;
      background-color: var(--surface-300);
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 0.5rem;

      .strength-fill {
        height: 100%;
        transition: all 0.3s ease;
        border-radius: 2px;

        &.weak {
          width: 25%;
          background-color: #ef4444;
        }

        &.medium {
          width: 50%;
          background-color: #f59e0b;
        }

        &.good {
          width: 75%;
          background-color: #10b981;
        }

        &.strong {
          width: 100%;
          background-color: #059669;
        }
      }
    }

    .strength-text {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;

      &.weak { color: #ef4444; }
      &.medium { color: #f59e0b; }
      &.good { color: #10b981; }
      &.strong { color: #059669; }
    }
  }

  .p-button {
    height: 3rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(var(--primary-color-rgb), 0.4);
    }
  }

  .text-primary {
    &:hover {
      text-decoration: underline;
    }
  }
}
```

---

## Implementing Routing & Navigation

### Step 1: Create Route Guards

First, let's create an authentication guard to protect routes:

```bash
ng generate guard guards/auth
```

```typescript
// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
```

**Guard Concepts Explained:**

1. **CanActivate**: Interface that determines if a route can be activated
2. **Route Protection**: Redirects to login if user is not authenticated
3. **Observable**: Returns an observable boolean to handle async authentication state

### Step 2: Configure Application Routes

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' } // Wildcard route for 404 pages
];
```

**Routing Concepts Explained:**

1. **Lazy Loading**: Components are loaded only when needed (`loadComponent`)
2. **Route Guards**: `canActivate` protects the dashboard route
3. **Wildcard Routes**: `**` catches all undefined routes
4. **Path Matching**: `pathMatch: 'full'` ensures exact path matching

### Step 3: Update App Component

```typescript
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-auth-app';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is already authenticated on app startup
    this.authService.currentUser$.subscribe(user => {
      if (user && this.router.url === '/') {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
```

```html
<!-- src/app/app.component.html -->
<router-outlet></router-outlet>
```

**App Component Concepts:**

1. **Router Outlet**: Where routed components are displayed
2. **Startup Logic**: Redirects authenticated users to dashboard
3. **Subscription Management**: Listening to authentication state changes

---

## Creating the Dashboard Page

### Step 1: Generate Dashboard Component

```bash
ng generate component components/dashboard
```

### Step 2: Implement Dashboard Component with RxJS

```typescript
// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, map, filter, tap } from 'rxjs/operators';
import { AuthService, User } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Reactive properties
  currentUser$ = this.authService.user$;
  isLoading$ = this.authService.isLoading$;
  notifications$ = this.authService.notifications$;

  // Computed observables
  userDisplayName$ = this.currentUser$.pipe(
    filter(user => user !== null),
    map(user => `${user!.firstName} ${user!.lastName}`)
  );

  greeting$ = this.currentUser$.pipe(
    map(() => this.getGreeting())
  );

  // Dashboard stats (example of combining multiple observables)
  dashboardStats$ = combineLatest([
    this.currentUser$,
    this.isLoading$
  ]).pipe(
    map(([user, isLoading]) => ({
      totalLogins: user ? Math.floor(Math.random() * 100) + 1 : 0,
      accountAge: user ? Math.floor(Math.random() * 365) + 1 : 0,
      lastActivity: user ? new Date().toLocaleDateString() : 'N/A',
      isLoading
    }))
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setupReactiveSubscriptions();
    this.checkAuthenticationState();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupReactiveSubscriptions(): void {
    // Handle authentication state changes
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      });

    // Handle notifications from auth service
    this.notifications$
      .pipe(
        takeUntil(this.destroy$),
        filter(notifications => notifications.length > 0)
      )
      .subscribe(notifications => {
        notifications.forEach(notification => {
          this.messageService.add({
            severity: notification.type === 'error' ? 'error' : 
                     notification.type === 'success' ? 'success' : 
                     notification.type === 'warning' ? 'warn' : 'info',
            summary: notification.type.charAt(0).toUpperCase() + notification.type.slice(1),
            detail: notification.message
          });
        });
      });

    // Auto-refresh user data every 5 minutes (example of periodic updates)
    // timer(0, 300000).pipe(
    //   takeUntil(this.destroy$),
    //   switchMap(() => this.authService.refreshUser())
    // ).subscribe();
  }

  private checkAuthenticationState(): void {
    // Ensure user is authenticated on component load
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Logout handled by service, navigation handled by subscription
        },
        error: (error) => {
          console.error('Logout error:', error);
          // Force navigation even if logout fails
          this.router.navigate(['/login']);
        }
      });
  }

  refreshUserData(): void {
    this.authService.refreshUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User data refreshed successfully'
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to refresh user data'
          });
        }
      });
  }

  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  // Method to clear specific notification
  clearNotification(notificationId: string): void {
    this.authService.removeNotification(notificationId);
  }
}
```

**Advanced Component Concepts:**

1. **Computed Observables**: Deriving data from other observables
2. **CombineLatest**: Combining multiple data streams
3. **Filter Operations**: Only processing relevant data changes
4. **Subscription Management**: Proper cleanup with takeUntil pattern
5. **Error Boundaries**: Handling different types of errors appropriately

**Component Lifecycle Concepts:**

1. **OnDestroy**: Cleanup lifecycle hook for memory leak prevention
2. **Subject Pattern**: Used to manage subscription cleanup
3. **takeUntil**: RxJS operator that completes the subscription when component is destroyed

### Step 3: Create Reactive Dashboard Template

```html
<!-- src/app/components/dashboard/dashboard.component.html -->
<div class="min-h-screen surface-50">
  <!-- Header -->
  <div class="surface-0 shadow-2 border-bottom-1 surface-border">
    <div class="container mx-auto p-4">
      <div class="flex align-items-center justify-content-between">
        <div class="flex align-items-center">
          <i class="pi pi-home text-primary text-2xl mr-3"></i>
          <h1 class="text-2xl font-bold text-900 m-0">Dashboard</h1>
        </div>
        <div class="flex align-items-center gap-3">
          <span class="text-color-secondary" *ngIf="currentUser$ | async as user">
            {{ greeting$ | async }}, {{ user.firstName }}!
          </span>
          <button 
            pButton 
            pRipple 
            icon="pi pi-refresh" 
            label="Refresh" 
            class="p-button-outlined p-button-sm mr-2"
            [loading]="isLoading$ | async"
            (click)="refreshUserData()"
          ></button>
          <button 
            pButton 
            pRipple 
            icon="pi pi-sign-out" 
            label="Logout" 
            class="p-button-outlined"
            [disabled]="isLoading$ | async"
            (click)="logout()"
          ></button>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto p-4">
    <div class="grid">
      <!-- Welcome Card -->
      <div class="col-12">
        <p-card class="mb-4">
          <ng-template pTemplate="header">
            <div class="bg-primary text-primary-color p-4 text-center">
              <i class="pi pi-check-circle text-6xl mb-3"></i>
              <h2 class="text-2xl font-bold m-0">Welcome to Your Dashboard!</h2>
            </div>
          </ng-template>
          
          <ng-template pTemplate="content">
            <div class="text-center p-4">
              <p class="text-lg text-color-secondary mb-4">
                🎉 Congratulations! You have successfully logged into your account.
              </p>
              <p class="text-color-secondary mb-4">
                This is your personal dashboard where you can manage your account and access all available features.
              </p>
              
              <!-- User Information with Reactive Data -->
              <div class="bg-surface-100 border-round p-4 mb-4" *ngIf="currentUser$ | async as user">
                <h3 class="text-primary font-semibold mb-3">Your Account Information</h3>
                <div class="grid">
                  <div class="col-12 md:col-6">
                    <div class="field">
                      <label class="block text-900 font-medium mb-1">Full Name</label>
                      <p class="m-0 text-color">{{ userDisplayName$ | async }}</p>
                    </div>
                  </div>
                  <div class="col-12 md:col-6">
                    <div class="field">
                      <label class="block text-900 font-medium mb-1">Email Address</label>
                      <p class="m-0 text-color">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="col-12 md:col-6">
                    <div class="field">
                      <label class="block text-900 font-medium mb-1">User ID</label>
                      <p class="m-0 text-color">{{ user.id }}</p>
                    </div>
                  </div>
                  <div class="col-12 md:col-6">
                    <div class="field">
                      <label class="block text-900 font-medium mb-1">Login Time</label>
                      <p class="m-0 text-color">{{ new Date().toLocaleString() }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dashboard Stats with RxJS -->
              <div class="bg-surface-100 border-round p-4 mb-4" *ngIf="dashboardStats$ | async as stats">
                <h3 class="text-primary font-semibold mb-3">Account Statistics</h3>
                <div class="grid" *ngIf="!stats.isLoading">
                  <div class="col-12 md:col-4">
                    <div class="text-center">
                      <i class="pi pi-sign-in text-primary text-2xl"></i>
                      <p class="text-xl font-semibold m-1">{{ stats.totalLogins }}</p>
                      <p class="text-color-secondary text-sm m-0">Total Logins</p>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="text-center">
                      <i class="pi pi-calendar text-primary text-2xl"></i>
                      <p class="text-xl font-semibold m-1">{{ stats.accountAge }}</p>
                      <p class="text-color-secondary text-sm m-0">Days Active</p>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="text-center">
                      <i class="pi pi-clock text-primary text-2xl"></i>
                      <p class="text-xl font-semibold m-1">{{ stats.lastActivity }}</p>
                      <p class="text-color-secondary text-sm m-0">Last Activity</p>
                    </div>
                  </div>
                </div>
                <div *ngIf="stats.isLoading" class="text-center">
                  <p-progressSpinner styleClass="w-3rem h-3rem"></p-progressSpinner>
                  <p class="text-color-secondary mt-2">Loading statistics...</p>
                </div>
              </div>
            </div>
          </ng-template>
        </p-card>
      </div>

      <!-- Feature Cards -->
      <div class="col-12 md:col-4">
        <p-card class="h-full">
          <ng-template pTemplate="header">
            <div class="text-center p-3">
              <i class="pi pi-user text-primary text-4xl"></i>
            </div>
          </ng-template>
          <ng-template pTemplate="content">
            <div class="text-center">
              <h3 class="text-primary">Profile Management</h3>
              <p class="text-color-secondary">Update your personal information and preferences</p>
              <button pButton pRipple label="Coming Soon" class="w-full" disabled></button>
            </div>
          </ng-template>
        </p-card>
      </div>

      <div class="col-12 md:col-4">
        <p-card class="h-full">
          <ng-template pTemplate="header">
            <div class="text-center p-3">
              <i class="pi pi-cog text-primary text-4xl"></i>
            </div>
          </ng-template>
          <ng-template pTemplate="content">
            <div class="text-center">
              <h3 class="text-primary">Settings</h3>
              <p class="text-color-secondary">Configure your account settings and privacy options</p>
              <button pButton pRipple label="Coming Soon" class="w-full" disabled></button>
            </div>
          </ng-template>
        </p-card>
      </div>

      <div class="col-12 md:col-4">
        <p-card class="h-full">
          <ng-template pTemplate="header">
            <div class="text-center p-3">
              <i class="pi pi-chart-line text-primary text-4xl"></i>
            </div>
          </ng-template>
          <ng-template pTemplate="content">
            <div class="text-center">
              <h3 class="text-primary">Analytics</h3>
              <p class="text-color-secondary">View your activity and usage statistics</p>
              <button pButton pRipple label="Coming Soon" class="w-full" disabled></button>
            </div>
          </ng-template>
        </p-card>
      </div>
    </div>

    <!-- Reactive Notifications Display -->
    <div class="fixed top-0 right-0 m-4 z-5" *ngIf="notifications$ | async as notifications">
      <div *ngFor="let notification of notifications" class="mb-2">
        <p-message 
          [severity]="notification.type"
          [text]="notification.message"
          [closable]="true"
          (onClose)="clearNotification(notification.id)"
        ></p-message>
      </div>
    </div>
  </div>

  <!-- Toast for additional messages -->
  <p-toast></p-toast>
</div>
```

**Enhanced Reactive Template Features:**

1. **Observable-Driven UI**: All data is driven by observables with async pipe
2. **Computed Values**: `userDisplayName$` and `greeting$` are computed from user data
3. **Loading States**: Reactive loading indicators for different operations
4. **Real-time Statistics**: Dashboard stats update reactively
5. **Notification System**: Built-in notification display with reactive updates
6. **Conditional Rendering**: UI elements show/hide based on state changes
7. **Performance**: Minimal re-renders due to OnPush change detection strategy

### Step 4: Style the Dashboard

```scss
// src/app/components/dashboard/dashboard.component.scss
:host {
  .container {
    max-width: 1200px;
  }

  .p-card {
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-radius: 12px;

    &.h-full {
      height: 100%;
      
      .p-card-body {
        height: 100%;
        display: flex;
        flex-direction: column;
        
        .p-card-content {
          flex: 1;
        }
      }
    }

    .p-card-header {
      border-radius: 12px 12px 0 0;
    }
  }

  .bg-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
  }

  .field {
    label {
      color: var(--text-color-secondary);
      font-size: 0.875rem;
    }

    p {
      font-size: 1rem;
      font-weight: 500;
    }
  }

  .pi {
    &.text-6xl {
      font-size: 4rem;
    }
    
    &.text-4xl {
      font-size: 2.5rem;
    }
  }

  .p-button {
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
    }
  }
}
```

---

## Styling & Theming

### Understanding PrimeNG Theming

PrimeNG comes with several built-in themes. You can switch themes by changing the CSS import in your `angular.json`:

```json
{
  "styles": [
    "node_modules/primeng/resources/themes/lara-light-blue/theme.css", // Default theme
    // Alternative themes:
    // "node_modules/primeng/resources/themes/lara-dark-blue/theme.css",
    // "node_modules/primeng/resources/themes/saga-blue/theme.css",
    // "node_modules/primeng/resources/themes/vela-blue/theme.css",
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeflex/primeflex.css",
    "src/styles.scss"
  ]
}
```

### Custom Global Styles

Add global styles to enhance the overall appearance:

```scss
// src/styles.scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// Global custom properties
:root {
  --font-family: 'Inter', sans-serif;
  --border-radius: 12px;
  --transition: all 0.3s ease;
}

// Global styles
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  margin: 0;
  padding: 0;
  background-color: var(--surface-50);
}

// Custom utility classes
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.h-full {
  height: 100%;
}

.min-h-screen {
  min-height: 100vh;
}

// Enhanced PrimeNG component styles
.p-card {
  border: none !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  border-radius: var(--border-radius) !important;
}

.p-button {
  transition: var(--transition) !important;
  border-radius: 8px !important;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2) !important;
  }
}

.p-inputtext,
.p-password .p-inputtext {
  border-radius: 8px !important;
  transition: var(--transition) !important;
  
  &:focus {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.3) !important;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
}
```

### PrimeFlex Utility Classes Reference

PrimeFlex provides utility classes for common CSS properties:

**Layout:**
- `flex` - display: flex
- `grid` - display: grid
- `block` - display: block
- `inline` - display: inline

**Flexbox:**
- `align-items-center` - align-items: center
- `justify-content-center` - justify-content: center
- `flex-direction-column` - flex-direction: column

**Spacing:**
- `p-{size}` - padding (0-8)
- `m-{size}` - margin (0-8)
- `gap-{size}` - gap (1-8)

**Sizing:**
- `w-full` - width: 100%
- `h-full` - height: 100%
- `w-{size}` - width in 12-column grid system

**Responsive:**
- `md:w-6` - width 50% on medium screens and up
- `lg:w-4` - width 33.33% on large screens and up

---

## Best Practices & Security

### Security Considerations

1. **Token Storage**: 
   - Current implementation uses localStorage for simplicity
   - For production, consider httpOnly cookies or secure storage

2. **Input Validation**:
   - Always validate on both client and server side
   - Use Angular's built-in validators and create custom ones

3. **Password Requirements**:
   - Enforce strong password policies
   - Consider implementing password history

4. **HTTPS**:
   - Always use HTTPS in production
   - Configure secure headers

### Performance Optimization

1. **Lazy Loading**:
   - Use `loadComponent` for route-based code splitting
   - Load PrimeNG modules only where needed

2. **OnPush Change Detection**:
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

3. **Track By Functions**:
   ```typescript
   trackByFn(index: number, item: any): any {
     return item.id;
   }
   ```

4. **Subscription Management**:
   - Always unsubscribe to prevent memory leaks
   - Use `takeUntil` pattern or `async` pipe

### Development Best Practices

1. **Component Structure**:
   - Keep components focused and single-purpose
   - Use services for business logic
   - Implement proper error handling

2. **Type Safety**:
   - Use TypeScript interfaces for all data structures
   - Enable strict mode in TypeScript configuration

3. **Code Organization**:
   ```
   src/
   ├── app/
   │   ├── components/
   │   ├── services/
   │   ├── guards/
   │   ├── models/
   │   ├── shared/
   │   └── core/
   ```

4. **Testing**:
   - Write unit tests for components and services
   - Use Angular Testing Library for better testing practices
   - Implement E2E tests for critical user flows

### Common Pitfalls to Avoid

1. **Memory Leaks**: Always unsubscribe from observables
2. **Form Validation**: Don't rely only on client-side validation
3. **State Management**: Avoid storing complex state in components
4. **Performance**: Don't overuse change detection
5. **Security**: Never trust client-side validation alone

---

## Troubleshooting & Common Issues

### Module Import Issues

**Problem**: PrimeNG components not working
**Solution**: Ensure proper module imports in your component or app module

**Problem**: Styles not applying
**Solution**: Check that CSS files are properly imported in `angular.json`

### Form Validation Issues

**Problem**: Custom validators not working
**Solution**: Ensure validators return `null` for valid values and error objects for invalid ones

**Problem**: Form not updating after programmatic changes
**Solution**: Use `updateValueAndValidity()` method after changing form values

### Authentication Issues

**Problem**: User logged out after page refresh
**Solution**: Check localStorage implementation and ensure proper initialization in app component

**Problem**: Guards not working
**Solution**: Verify guard is properly imported and configured in routes

### Build and Development Issues

**Problem**: Build fails with PrimeNG imports
**Solution**: Update to latest Angular and PrimeNG versions, check compatibility

**Problem**: Development server won't start
**Solution**: Clear node_modules and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Conclusion

You've now learned how to build a complete Angular 20 application with authentication using PrimeNG and PrimeFlex. This guide covered:

- **Angular Fundamentals**: Components, services, routing, and reactive forms
- **PrimeNG Integration**: Using UI components and theming
- **Authentication System**: Complete login/registration flow with guards
- **Modern Practices**: TypeScript, reactive programming, and security considerations

### Next Steps

1. **Backend Integration**: Replace mock authentication with real API calls
2. **Advanced Features**: Add password reset, email verification, two-factor authentication
3. **Testing**: Implement comprehensive unit and integration tests
4. **Deployment**: Configure for production deployment with proper security headers
5. **Progressive Web App**: Add PWA capabilities for mobile experience

### Resources

- [Angular Documentation](https://angular.io/docs)
- [PrimeNG Documentation](https://primefaces.org/primeng)
- [PrimeFlex Documentation](https://primefaces.org/primeflex)
- [RxJS Documentation](https://rxjs.dev)
- [RxJS Operators Guide](https://rxjs.dev/guide/operators)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)

---

## Summary: Enhanced RxJS State Management

This documentation demonstrates a **production-ready, RxJS-based state management approach** that goes far beyond basic authentication. Here's what we've implemented:

### 🎯 **Key RxJS Patterns Covered:**

1. **Centralized State Management**
   - Single source of truth with BehaviorSubject
   - Immutable state updates
   - Type-safe state interfaces

2. **Reactive Selectors**
   - Derived observables with `distinctUntilChanged`
   - Performance-optimized data selection
   - Computed properties from multiple data sources

3. **Side Effects Management**
   - Declarative side effects with `tap` operator
   - Error handling with `catchError` and `retry`
   - Notification system with auto-cleanup

4. **Observable Composition**
   - `combineLatest` for multi-source data
   - `switchMap` for dependent async operations
   - `filter` for conditional data processing

5. **Memory Management**
   - `takeUntil` pattern for automatic unsubscription
   - Subject cleanup in ngOnDestroy
   - Subscription lifecycle management

### 🚀 **Benefits of This Approach:**

- **Predictable State**: All state changes flow through well-defined patterns
- **Reactive UI**: Components automatically update when data changes
- **Performance**: Minimal re-renders with smart memoization
- **Testability**: Isolated, pure functions that are easy to test
- **Scalability**: Patterns that work for small and large applications
- **Type Safety**: Full TypeScript support with interfaces and generics

### 🔧 **Production Readiness:**

- **Error Boundaries**: Comprehensive error handling at every level
- **Loading States**: User feedback for all async operations
- **Optimistic Updates**: Immediate UI feedback with rollback capability
- **Caching**: Smart data caching with `shareReplay`
- **Performance**: Debouncing, throttling, and efficient operators

This RxJS-based state management approach provides a solid foundation that can scale from simple authentication to complex, feature-rich applications while maintaining clean, maintainable code.

Happy coding! 🚀
