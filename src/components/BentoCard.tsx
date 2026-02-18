import React from 'react';
import { cn } from '../lib/utils';

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ children, className, title, subtitle, ...props }) => {
    return (
        <div className={cn("bento-card flex flex-col gap-2", className)} {...props}>
            {(title || subtitle) && (
                <div className="mb-4">
                    {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
                    {subtitle && <p className="text-sm text-neutral-400">{subtitle}</p>}
                </div>
            )}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};
