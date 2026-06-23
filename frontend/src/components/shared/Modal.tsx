'use client';

import Title from './Title';
import { useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components';
import { ModalProps } from '@/interfaces/modal.interface';

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div
                ref={overlayRef}
                onClick={(e) => e.target === overlayRef.current && onClose()}
                className='fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200'
            />

            <div className='relative w-full max-w-fit bg-white border border-outline-variant rounded-2xl shadow-xl p-12 z-10 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200'>
                <div className='flex items-start justify-between mb-8'>
                    <div>
                        <Title
                            text={title}
                            className='text-xl font-bold text-gray-900 tracking-tight'
                        />
                        {description && (
                            <Title text={description} className='text-sm max-w-lg text-gray-500 mt-4' />
                        )}
                    </div>
                    <Button
                        onClick={onClose}
                        className='rounded-lg text-gray-900 transition-colors'
                    >
                        <X size={24} className='text-gray-900 transition-colors font-bold' />
                    </Button>
                </div>
                <div className='mt-2'>{children}</div>
            </div>
        </div>
    );
}
