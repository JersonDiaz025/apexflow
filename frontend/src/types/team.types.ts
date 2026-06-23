export type TeamFormState = {
    errors?: {
        email?: string[];
    };
    message?: string;
    success?: boolean;
    data?: {
        email?: string;
    };
};
