export type BaseFormTexts = {
    emailLabel: string;
    defaultValue?: string;
    emailPlaceholder: string;
    nameLabel?: string | undefined;
    namePlaceholder?: string | undefined;
    usernameLabel?: string | undefined;
    usernamePlaceholder?: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitButton: string;
    loadingButton: string;
};

export type LoginFormTexts = BaseFormTexts;

export type FormState = {
    errors?: {
        email?: string[];
        name?: string[];
        password?: string[];
    };
    message?: string;
    success?: boolean;
    data?: Record<string, string>;
};

export type GenericFormState<T> = {
    errors?: {
        [K in keyof T]?: string[];
    };
    message?: string;
    success?: boolean;
    data?: Partial<T>;
};
import { CreateBoardInput } from '@/schemas/board.schema';
export type BoardFormState = GenericFormState<CreateBoardInput>;

export type FormAction = (prevState: FormState, formData: FormData) => Promise<FormState>;

export interface FormProps<T extends BaseFormTexts> {
    texts: T;
    isRegister?: boolean;
    action: FormAction;
}

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorLabel: FormState['errors'] | FormState['message'];
    rightElement?: React.ReactNode;
}

export interface ErrorLabelProps {
    errorLabel: FormFieldProps['errorLabel'] | undefined;
    classes?: string;
}
