enum Role {
    ADMIN,
    USER
}

export interface User {
    id?: string;
    email: string;
    password: string;
    birth_date: string;
    name: string;
    cpf: string;
    role?: Role;
}