export interface User {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    address?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    birth_date?: Date;
    reputation?: number;
    blocked?: boolean;
    roles?: string[];
    library?: any;
}