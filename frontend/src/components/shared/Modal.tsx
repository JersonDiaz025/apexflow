'use client';

import Title from './Title';
import { useRef } from 'react';
import { X } from 'lucide-react';
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

            <div className='relative w-full max-w-lg bg-white border border-outline-variant rounded-2xl shadow-xl p-6 z-10 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-200'>
                <div className='flex items-start justify-between mb-4'>
                    <div>
                        <Title
                            text={title}
                            className='text-xl font-bold text-gray-900 tracking-tight'
                        />
                        {description && (
                            <Title text={description} className='text-sm text-gray-500 mt-1' />
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className='p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors'
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className='mt-2'>{children}</div>
            </div>
        </div>
    );
}
