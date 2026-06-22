import { Input } from '@/components/shared/Input';
import { FormFieldProps } from '@/types/form.types';
import { ErrorLabel } from '@/components/shared/ErrorLabel';

export const FormField = ({
    label,
    defaultValue,
    errorLabel,
    rightElement,
    ...props
}: FormFieldProps) => {
    return (
        <div className='space-y-1'>
            <div className='flex justify-between items-center mb-3 ml-1'>
                <label className="text-xs font-semibold tracking-wider text-gray-500 block mb-1">
                    {label}
                </label>
                {rightElement}
            </div>
            <Input hasError={!!errorLabel} defaultValue={defaultValue} {...props} />
            <ErrorLabel errorLabel={errorLabel} />
        </div>
    );
};
