import AppLayout from '@/layouts/AppLayout';
import { PageTransition } from '@/components';
import { AuthProvider } from '@/providers/auth.provider';
import { profileService } from '@/services/user/profile.service';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await profileService.getProfile();
    return (
        <AuthProvider user={user}>
            <AppLayout>
                <PageTransition className='flex-1'>{children}</PageTransition>
            </AppLayout>
        </AuthProvider>
    );
}
