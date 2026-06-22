import data from '@/data/auth/data.json';
import AuthLayout from '@/layouts/AuthLayout';
import Title from '@/components/shared/Title';
import { ROUTES } from '@/constants/routes.constant';
import { loginAction } from '@/actions/auth/login-action';
import FormContent from '@/features/auth/components/FormContent';

export default function LoginPage() {
    const commonTexts = data.common;
    const loginTexts = data.auth.login;
    const { title, footerActionText, alreadyHaveAccount } = loginTexts;

    return (
        <AuthLayout
            footerHref={ROUTES.REGISTER}
            footerActionText={footerActionText}
            footerLinkText={alreadyHaveAccount}
        >
            <Title as='h1' className='text-3xl font-extrabold tracking-tighte mb-8'>
                {title}
            </Title>
            <FormContent
                action={loginAction}
                texts={{
                    ...loginTexts,
                    ...commonTexts,
                }}
            />
        </AuthLayout>
    );
}
