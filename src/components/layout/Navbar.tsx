import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { CTAButton } from '@/components/ui/cta-button';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { smoothScrollTo } from '@/lib/smooth-scroll';
import { cn } from '@/lib/utils';

const homeNavigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'theme', label: 'Theme' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
];

const mainNavigationItems = [
    { path: '/', label: 'Home', isRoute: true },
    { path: '/speakers', label: 'Speakers', isRoute: true },
    { path: '/schedule', label: 'Schedule', isRoute: true },
    { path: '/partners', label: 'Partners', isRoute: true },
    { path: '/contact', label: 'Contact', isRoute: true },
    { path: '/team', label: 'Team', isRoute: true }
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const activeSection = useScrollSpy(homeNavigationItems.map(item => item.id));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (id: string) => {
        if (isHomePage) {
            smoothScrollTo(id);
        }
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
                isScrolled
                    ? 'bg-black/50 shadow-lg border-b border-white/10'
                    : 'bg-white/5'
            )}
        >
            <div className='container mx-auto px-4 sm:px-6 lg:px-4'>
                <div className='flex items-center justify-between h-14 sm:h-16 md:h-20'>
                    {/* Logo */}
                    <Link
                        to='/'
                        className='focus:outline-none'
                    >
                        <Logo className={cn(isScrolled ? 'text-foreground' : 'text-white')} />
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                        className='hidden lg:flex items-center gap-8'
                    >
                        {/* Home link */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Link
                                to='/'
                                className={cn(
                                    'text-sm font-medium transition-colors duration-200 hover:text-[var(--color-tedx-red)]',
                                    location.pathname === '/'
                                        ? 'text-[var(--color-tedx-red)]'
                                        : isScrolled
                                          ? 'text-muted-foreground'
                                          : 'text-white'
                                )}
                            >
                                Home
                            </Link>
                        </motion.div>

                        {/* About and Theme sections - only on homepage */}
                        {isHomePage && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    onClick={() => handleNavClick('about')}
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-200 hover:text-[var(--color-tedx-red)]',
                                        activeSection === 'about'
                                            ? 'text-[var(--color-tedx-red)]'
                                            : isScrolled
                                              ? 'text-muted-foreground'
                                              : 'text-white'
                                    )}
                                >
                                    About
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    onClick={() => handleNavClick('theme')}
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-200 hover:text-[var(--color-tedx-red)]',
                                        activeSection === 'theme'
                                            ? 'text-[var(--color-tedx-red)]'
                                            : isScrolled
                                              ? 'text-muted-foreground'
                                              : 'text-white'
                                    )}
                                >
                                    Theme
                                </motion.button>
                            </>
                        )}

                        {/* Speakers, Schedule, Partners, Contact, Team */}
                        {mainNavigationItems.slice(1).map(item => (
                            <motion.div
                                key={item.path}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link
                                    to={item.path}
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-200 hover:text-[var(--color-tedx-red)]',
                                        location.pathname === item.path
                                            ? 'text-[var(--color-tedx-red)]'
                                            : isScrolled
                                              ? 'text-muted-foreground'
                                              : 'text-white'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                        className='hidden md:flex items-center gap-4'
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CTAButton
                                href='#register'
                                size='sm'
                                className='shadow-lg'
                            >
                                Buy Tickets
                            </CTAButton>
                        </motion.div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            'lg:hidden p-2.5 sm:p-3 rounded-md transition-colors min-w-12 min-h-12 flex items-center justify-center',
                            isScrolled ? 'text-foreground' : 'text-white'
                        )}
                        aria-label='Toggle navigation menu'
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className='lg:hidden absolute top-full left-0 right-0 bg-background/95 border-t border-white/10 shadow-lg'
                    >
                        <div className='py-2 sm:py-3'>
                            {/* Home link */}
                            <Link
                                to='/'
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    'block w-full text-left px-4 sm:px-6 py-3.5 sm:py-4 text-foreground hover:bg-muted hover:text-[var(--color-tedx-red)] transition-colors min-h-14 flex items-center',
                                    location.pathname === '/' && 'text-[var(--color-tedx-red)] bg-muted'
                                )}
                            >
                                Home
                            </Link>

                            {/* About and Theme sections - only on homepage */}
                            {isHomePage && (
                                <>
                                    <button
                                        onClick={() => handleNavClick('about')}
                                        className={cn(
                                            'block w-full text-left px-4 sm:px-6 py-3.5 sm:py-4 text-foreground hover:bg-muted hover:text-[var(--color-tedx-red)] transition-colors min-h-14 flex items-center',
                                            activeSection === 'about' && 'text-[var(--color-tedx-red)] bg-muted'
                                        )}
                                    >
                                        About
                                    </button>
                                    <button
                                        onClick={() => handleNavClick('theme')}
                                        className={cn(
                                            'block w-full text-left px-4 sm:px-6 py-3.5 sm:py-4 text-foreground hover:bg-muted hover:text-[var(--color-tedx-red)] transition-colors min-h-14 flex items-center',
                                            activeSection === 'theme' && 'text-[var(--color-tedx-red)] bg-muted'
                                        )}
                                    >
                                        Theme
                                    </button>
                                </>
                            )}

                            {/* Speakers, Schedule, Partners, Contact, Team */}
                            {mainNavigationItems.slice(1).map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'block w-full text-left px-4 sm:px-6 py-3.5 sm:py-4 text-foreground hover:bg-muted hover:text-[var(--color-tedx-red)] transition-colors min-h-14 flex items-center',
                                        location.pathname === item.path && 'text-[var(--color-tedx-red)] bg-muted'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {/* Mobile CTA Section */}
                            <div className='px-4 sm:px-6 py-4 sm:py-5 border-t border-border'>
                                <CTAButton
                                    href='#register'
                                    className='w-full py-4 sm:py-4 min-h-14'
                                >
                                    Buy Tickets
                                </CTAButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};
