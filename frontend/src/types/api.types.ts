export interface NestErrorResponse {
    message: string | string[];
    error: string;
    errors?: Record<string, string[]>;
    statusCode: number;
}

export interface DataResponse {
    data: NestErrorResponse;
}

export interface ApiError {
    message: string;
    errors?: string[];
    response?: DataResponse;
}
