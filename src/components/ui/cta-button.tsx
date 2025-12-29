import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-animation';
import { useNavigate } from 'react-router-dom';

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'default' | 'lg' | 'sm';
    href?: string;
    className?: string;
    isLoading?: boolean;
}

export const CTAButton = ({
    children,
    variant = 'primary',
    size = 'default',
    href,
    className,
    onClick,
    isLoading = false,
    disabled,
    ...props
}: CTAButtonProps) => {
    const navigate = useNavigate();
    const baseClasses = 'font-semibold transition-all duration-300 transform hover:scale-105 focus:scale-105';

    const variantClasses = {
        primary: 'bg-(--color-tedx-red) hover:bg-(--color-tedx-red)/90 text-white border-0',
        secondary:
            'bg-transparent border-2 border-(--color-tedx-red) text-(--color-tedx-red) hover:bg-(--color-tedx-red) hover:text-white'
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (href) {
            if (href.startsWith('#')) {
                e.preventDefault();
                // Handle special navigation cases
                if (href === '#register' || href === '#buy-tickets') {
                    navigate('/tickets');
                } else if (href === '#volunteer') {
                    navigate('/volunteer');
                } else if (href === '#speaker-nomination') {
                    navigate('/nominate-speaker');
                } else if (href === '#partner') {
                    navigate('/partnership');
                } else {
                    // Regular scroll for other hash links
                    const element = document.getElementById(href.substring(1));
                    element?.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (href.startsWith('/')) {
                // Internal route
                navigate(href);
            } else {
                // External link
                window.open(href, '_blank');
            }
        }
        onClick?.(e);
    };

    return (
        <Button
            className={cn(
                baseClasses,
                variantClasses[variant],
                isLoading && 'opacity-80 cursor-not-allowed',
                className
            )}
            size={size}
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className='flex items-center gap-2'>
                    <LoadingSpinner size='sm' />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </Button>
    );
};
