import { Loader2 } from 'lucide-react'
import React from 'react'

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-18 h-18',
};

export default function Loader({ size = 'md' }: LoaderProps) {
    return (
        <div className="flex justify-center items-center p-4">
            <Loader2
                className={`${sizeMap[size]} animate-spin text-[var(--accent-primary)]`}
            />
        </div>
    )
}
