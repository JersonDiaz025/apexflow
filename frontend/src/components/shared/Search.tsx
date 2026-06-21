'use client';

import { Input } from './Input';
import { Search } from 'lucide-react';
import { SearchInputProps } from '@/interfaces/search.interface';

export default function SearchInput({
    placeholder = 'Search...',
    value,
    onChange,
}: SearchInputProps) {
    return (
        <div className='relative hidden md:block'>
            <Search
                size={18}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant'
            />
            <input
                type='text'
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className='pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-precision text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all'
            />
        </div>
    );
}
