'use client';

import { UserPlus } from 'lucide-react';
import { Button } from '@/components';
import { MemberGroupProps } from '@/interfaces/members.interface';

export default function MemberGroup({ members = [], maxVisible = 3, onAddMemberClick }: MemberGroupProps) {
    if (!members || members.length === 0) return null;

    const visibleMembers = members.slice(0, maxVisible);
    const extraCount = members.length - maxVisible;

    return (
        <div className='hidden md:flex items-center gap-4 animate-fade-in'>
            <div className='flex -space-x-2'>
                {visibleMembers.map((member) => (
                    <div
                        key={member.id}
                        title={member.name}
                        className='w-8 h-8 rounded-full border-2 hover:-translate-x-2 transition duration-300 z-2 bg-primary/10 border-2 border-white flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0 uppercase shadow-sm'
                    >
                        {member.avatar || member.name.substring(0, 2)}
                    </div>
                ))}

                {extraCount > 0 && (
                    <div className='w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-xs font-bold text-on-surface-variant flex-shrink-0 shadow-sm'>
                        +{extraCount}
                    </div>
                )}
            </div>

            <Button
                onClick={onAddMemberClick}
                className='text-on-surface-variant hover:text-primary transition-colors p-1 hover:bg-surface-container-low rounded-full'
            >
                <UserPlus size={18} />
            </Button>
        </div>
    );
}
