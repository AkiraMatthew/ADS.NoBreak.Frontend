export interface User {
    id: string;
    email: string;
    name: string;
    plan: 'free' | 'basic' | 'standard' | 'premium' | 'enterprise';
    country: string;
}

export interface PasswordEntry {
    id: string;
    title: string;
    username: string;
    password: string;
    website?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean
    error: string | null;
    loading: boolean;
}

export interface PasswordState {
    vault: PasswordEntry[];
    loading: boolean;
    error: string | null;
    selectedPassword: PasswordEntry | null;
}

export interface AppState {
    auth: AuthState;
    password: PasswordState;
}
