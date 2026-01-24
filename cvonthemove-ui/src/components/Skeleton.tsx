import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width,
    height,
    borderRadius,
    className = '',
    variant = 'rect'
}) => {
    const style: React.CSSProperties = {
        width,
        height,
        borderRadius: variant === 'circle' ? '50%' : borderRadius,
    };

    return (
        <div
            className={`skeleton skeleton-${variant} ${className}`}
            style={style}
        />
    );
};
