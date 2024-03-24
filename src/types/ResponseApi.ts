export interface ResponseApi<T = any> extends Response {
    status: number;
    data: {
        status: string;
        msg?: string;
        accessToken?: string;
        data?: T;
        totalItems?: number;
    };
}
