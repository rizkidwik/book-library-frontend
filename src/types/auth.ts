export interface User {
    id: number;
    email: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials extends LoginCredentials {
    name: string   
}

export interface AuthResponse {
    user: User
    token: string
}

export interface LoginResponse {
    data: {
        user: User
        token: string
    }
}