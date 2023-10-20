export interface IJwtHandler {
    isTokenExpired(token: string | null): boolean;
    decodeToken(token: string | null): any;
}