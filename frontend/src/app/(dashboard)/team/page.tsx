import TeamPage from '@/features/team/pages/TeamPage';
import { PageProps } from '@/interfaces/team.interface';
import { teamService } from '@/services/team/team.service';

export default async function Page({ searchParams }: PageProps) {
    const { search } = await searchParams;
    const teamData = await teamService.getUsers(search);

    return <TeamPage teamData={teamData} currentSearch={search ?? ''} />;
}
