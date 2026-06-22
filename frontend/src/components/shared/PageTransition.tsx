'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode='wait' initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{
                    duration: 0.25,
                    ease: 'easeOut',
                }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
