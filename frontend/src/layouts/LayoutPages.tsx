'use client';

import React from 'react';
import { Title } from '@/components';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { BreadcrumbLink } from '@/interfaces/breadcrumb.interface';
interface LayoutPagesProps {
    title: string;
    subTitle?: string;
    children: React.ReactNode;
    rightContent?: React.ReactNode;
    breadcrumbItems?: BreadcrumbLink[];
}

export function LayoutPages({
    title,
    subTitle,
    children,
    rightContent,
    breadcrumbItems,
}: LayoutPagesProps) {
    return (
        <main className='w-full'>
            <header className='mb-8 relative flex flex-col gap-2'>
                {breadcrumbItems && breadcrumbItems.length > 0 && (
                    <div className='mb-1 animate-in fade-in duration-200'>
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                )}

                <div className={rightContent ? 'flex items-center justify-between w-full' : ''}>
                    <div>
                        <Title
                            text={title}
                            className='text-3xl font-bold text-slate-900 tracking-tight'
                        />
                        {subTitle && (
                            <Title text={subTitle} className='text-slate-500 text-sm mt-1' />
                        )}
                    </div>
                    {rightContent && (
                        <div className='flex items-center gap-4 flex-1'>{rightContent}</div>
                    )}
                </div>
            </header>
            <div className='w-full'>{children}</div>
        </main>
    );
}

export default LayoutPages;
