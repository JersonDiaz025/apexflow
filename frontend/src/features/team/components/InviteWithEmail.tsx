'use client';

import { Button } from '@/components';
import { Mail } from 'lucide-react';

interface InviteWithEmailProps {
    handleOpen: () => void;
}

export const InviteWithEmail = ({ handleOpen }: InviteWithEmailProps) => {
    return (
        <div>
            <Button
                onClick={handleOpen}
                className='flex items-center gap-2 h-12 px-4 bg-primary text-gray-700 border border-gray-200 shadow-sm font-medium text-xs rounded-md transition-all active:scale-[0.98] cursor-pointer'
            >
                <Mail size={14} className='text-white' />
                <span>Invitar usuario externo</span>
            </Button>
        </div>
    );
};

export default InviteWithEmail;
