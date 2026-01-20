import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Particle3DBackground } from './Particle3DBackground';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='relative w-full bg-black'>
            <Particle3DBackground />
            <div className='relative z-10 w-full'>
                <Navbar />
                <main className='w-full'>{children}</main>
            </div>
        </div>
    );
};
