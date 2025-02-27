import React from 'react';

interface HoverTooltipProps {
    children: React.ReactNode;
    message: string;
    onClick?: () => void;
}

export default function HoverTooltip({ children, message, onClick }: HoverTooltipProps) {
    return (
        <div className="relative group inline-flex items-center" onClick={onClick}>
            {children}
            <span className="absolute top-9 left-1/3 -translate-x-1/2 scale-0 opacity-0 transition-all duration-200 bg-gray-800 text-white text-xs rounded-md px-3 py-1 w-max text-wrap z-50 group-hover:scale-100 group-hover:opacity-100 shadow-lg">
                {message}
            </span>
        </div>
    );
}
