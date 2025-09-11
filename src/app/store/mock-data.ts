import { PasswordEntry, User } from './models';

export const MOCK_USER: User = {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    plan: 'standard',
    country: 'United States'
};

export const MOCK_PASSWORDS: PasswordEntry[] = [
    {
        id: '1',
        title: 'Gmail Account',
        username: 'john.doe@gmail.com',
        password: 'mock-password-1',
        website: 'https://gmail.com',
        notes: 'Personal email account',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01')
    },
    {
        id: '2',
        title: 'GitHub Account',
        username: 'johndoe',
        password: 'mock-password-2',
        website: 'https://github.com',
        notes: 'Development account',
        createdAt: new Date('2025-01-02'),
        updatedAt: new Date('2025-01-02')
    }
];
