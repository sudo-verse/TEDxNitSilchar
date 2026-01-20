import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import DotGrid from '@/components/DotGrid/DotGrid';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='min-h-screen relative'>
            <div className='fixed inset-0 z-[-1] bg-black'>
                <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#271E37"
                    activeColor="#5227FF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>
            <Navbar />
            <main className="relative z-10">{children}</main>
        </div>
    );
};
