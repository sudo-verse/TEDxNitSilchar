import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className='min-h-screen relative'>
            <div className='fixed inset-0 z-[-1] bg-black'></div>
            <Navbar />
            <main className="relative z-10">{children}</main>
        </div>
    );
};
