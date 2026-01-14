import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { DynamicBackground } from './DynamicBackground';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='relative min-h-screen bg-black overflow-hidden'>
            <DynamicBackground />
            <div className='relative z-10'>
                <Navbar />
                <main>{children}</main>
            </div>
        </div>
    );
};
