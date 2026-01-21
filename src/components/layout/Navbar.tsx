import { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Mic, Users, Calendar, Ticket, Heart, Phone, Handshake } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { smoothScrollTo } from '@/lib/smooth-scroll';
import { cn } from '@/lib/utils';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';
    const activeSection = useScrollSpy(['home', 'about']);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (path: string, id?: string) => {
        setIsOpen(false);

        if (id) {
            // Scroll behavior for Home/About
            if (isHomePage) {
                smoothScrollTo(id);
            } else {
                navigate(`/#${id}`);
                // Small timeout to allow navigation to complete before scrolling
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else {
            // Standard Route Navigation
            navigate(path);
            window.scrollTo(0, 0);
        }
    };

    const navLinks = [
        { path: '/', id: 'home', label: 'Home', icon: <Home size={16} /> },
        { path: '/', id: 'about', label: 'About', icon: <Info size={16} /> },
        { path: '/speakers', label: 'Speakers', icon: <Mic size={16} /> },
        { path: '/schedule', label: 'Schedule', icon: <Calendar size={16} /> },
        { path: '/team', label: 'Team', icon: <Users size={16} /> },
        { path: '/partners', label: 'Partners', icon: <Handshake size={16} /> },
        { path: '/tickets', label: 'Tickets', icon: <Ticket size={16} /> },
        { path: '/volunteer', label: 'Volunteer', icon: <Heart size={16} /> },
    ];

    const isActive = (path: string, id?: string) => {
        if (id && isHomePage) {
            return activeSection === id;
        }
        return location.pathname === path && !id;
    };

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-black/90 backdrop-blur-md border-white/10 py-1'
                    : 'bg-transparent border-transparent py-1'
            )}
        >
            <div className='container mx-auto px-6 lg:px-12 relative flex items-center justify-end h-16'>
                {/* Logo */}
                <Link to='/' className='absolute left-6 lg:left-12 top-0 flex items-center gap-2 focus:outline-none z-50 -ml-4 -mt-10 lg:-mt-14'>
                    <Logo className="text-white" size='sm' />
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center gap-6 xl:gap-8'>
                    {navLinks.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavClick(item.path, item.id)}
                            className={cn(
                                'flex items-center gap-2 text-[15px] xl:text-[17px] font-[400] tracking-wide transition-colors duration-200 font-[family-name:var(--font-body-serif)]',
                                isActive(item.path, item.id)
                                    ? 'text-[var(--color-tedx-red)]'
                                    : 'text-gray-300 hover:text-white'
                            )}
                        >
                            <span className="opacity-70">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Contact Link (Far Right) */}
                <div className='hidden lg:flex items-center ml-8'>
                    <button
                        onClick={() => handleNavClick('/contact')}
                        className={cn(
                            'flex items-center gap-2 text-[15px] xl:text-[17px] font-[400] tracking-wide transition-colors duration-200 font-[family-name:var(--font-body-serif)]',
                            location.pathname === '/contact'
                                ? 'text-[var(--color-tedx-red)]'
                                : 'text-gray-300 hover:text-white'
                        )}
                    >
                        <span className="opacity-70"><Phone size={16} /></span>
                        <span>Contact</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='lg:hidden p-2 text-white z-50'
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className='lg:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center space-y-6 animate-in fade-in duration-200 overflow-y-auto py-20'>
                    {[...navLinks, { path: '/contact', label: 'Contact', icon: <Phone size={20} /> }].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavClick(item.path, item.id)}
                            className={cn(
                                'flex items-center gap-4 text-xl sm:text-2xl font-[family-name:var(--font-body-serif)]',
                                isActive(item.path, item.id)
                                    ? 'text-[var(--color-tedx-red)]'
                                    : 'text-white/80'
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};
