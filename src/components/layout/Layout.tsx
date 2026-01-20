import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { ParticleBackground } from './ParticleBackground';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='relative w-full bg-black'>
            <ParticleBackground />
            <div className='relative z-10 w-full'>
                <Navbar />
                <main className='w-full'>{children}</main>
            </div>
        </div>
    );
};
