export interface userAuthInterface {
    user?: {
        name: string,
        email: string,
    }
    token?: string,
    logged: boolean,
    loading: boolean,
}
export interface authContextInterface {
    auth: userAuthInterface,
}
