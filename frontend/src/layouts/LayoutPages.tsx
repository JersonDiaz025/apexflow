import { Title } from '@/components';
import React from 'react';

const LayoutPages = ({ title, subTitle, children }) => {
    return (
        <main
        // className='max-w-4xl mx-auto p-8'
        >
            <header className='mb-12 relative'>
                <Title text={title} className='text-3xl font-bold text-slate-900 mt-1' />
                <Title text={subTitle} className='text-slate-500 text-sm' />
            </header>

            <div className=''>{children}</div>
        </main>
    );
};

export default LayoutPages;
