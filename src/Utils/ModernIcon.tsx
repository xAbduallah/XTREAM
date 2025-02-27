import { Loader } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import React from 'react';

interface LoaderProps {
    loading?: boolean;
    icon?: string | null;
    className?: string;
    onClick?: () => void;
}

export default function ModernIcon({ icon, loading = false, className = '', onClick = () => { } }: LoaderProps) {
    return (
        <button disabled={loading} onClick={onClick} className="relative">
            {loading &&
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader className='w-6 h-6 animate-spin text-[var(--text-primary)]' />
                </div>
            }
            <DynamicIcon name={icon as any} className={className} />
        </button>
    );
}
