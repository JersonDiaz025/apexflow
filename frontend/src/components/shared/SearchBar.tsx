'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Input } from '@/components/shared/Input';
import { Search } from 'lucide-react';

export default function SearchBar({ defaultValue }: { defaultValue: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }

        startTransition(() => {
            router.replace(`?${params.toString()}`);
        });
    };

    return (
        <div className='relative max-w-lg mb-6'>
            <Input
                type='text'
                placeholder='Buscar miembros por nombre o email...'
                defaultValue={defaultValue}
                onChange={(e) => handleSearch(e.target.value)}
                className='pl-11'
            />
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />

            {isPending && (
                <span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 animate-pulse'>
                    Buscando...
                </span>
            )}
        </div>
    );
}
