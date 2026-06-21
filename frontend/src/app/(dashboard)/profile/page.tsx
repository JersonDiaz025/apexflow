import { ProfilePage } from '@/features/profile';
import { profileService } from '@/services/user/profile.service';

export default async function Page() {
    const user = await profileService.getProfile();

    console.log(user);

    return <ProfilePage user={user} />;
}
