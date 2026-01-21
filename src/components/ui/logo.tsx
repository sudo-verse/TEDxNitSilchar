import { Link } from "react-router-dom";

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Logo = ({ className, size = 'lg' }: LogoProps) => {
    const sizeClasses = {
        sm: 'h-32 md:h-48',
        md: 'h-48 md:h-56',
        lg: 'h-48 md:h-56'
    };

    return (
        <div className={className}>
            <img
                src="/tedxlogo.png"
                alt="TEDx NIT Silchar"
                className={`${sizeClasses[size]} w-auto object-contain`}
            />
        </div>
    );
};
