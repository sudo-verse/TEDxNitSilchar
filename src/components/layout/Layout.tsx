import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { DynamicBackground } from './DynamicBackground';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='relative w-full bg-black'>
            <DynamicBackground />
            <div className='relative z-10 w-full'>
                <Navbar />
                <main className='w-full'>{children}</main>
            </div>
        </div>
    );
};
