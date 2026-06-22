export type BoardFormState = {
    errors?: {
        title?: string[];
        description?: string[];
    };
    message?: string;
    success?: boolean;
    data?: {
        title?: string;
        description?: string;
    };
};
