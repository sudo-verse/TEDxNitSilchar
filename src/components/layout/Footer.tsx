import { Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';

export const Footer = () => {
    return (
        <footer
            id='contact'
            className='bg-black text-white py-12 sm:py-14 lg:py-16 font-[family-name:var(--font-body-serif)]'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 lg:mb-12'>
                        {/* Logo & Description */}
                        <div className='sm:col-span-2 lg:col-span-2 space-y-3 sm:space-y-4'>
                            <Logo
                                className='text-white'
                                size='lg'
                            />

                            <p className='text-gray-400 max-w-md leading-relaxed text-sm sm:text-base'>
                                TEDxNITSilchar is an independently organized TED event that brings together innovative
                                minds to share ideas worth spreading from the heart of Northeast India.
                            </p>

                            <p className='text-xs sm:text-sm text-gray-500'>
                                This independent TEDx event is operated under license from TED.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className='text-base sm:text-lg font-semibold mb-3 sm:mb-4'>Quick Links</h3>
                            <ul className='space-y-2'>
                                <li>
                                    <Link
                                        to='/'
                                        className='text-gray-400 hover:text-[var(--color-tedx-red)] transition-colors'
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/speakers'
                                        className='text-gray-400 hover:text-[var(--color-tedx-red)] transition-colors'
                                    >
                                        Speakers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/schedule'
                                        className='text-gray-400 hover:text-[var(--color-tedx-red)] transition-colors'
                                    >
                                        Schedule
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/partners'
                                        className='text-gray-400 hover:text-[var(--color-tedx-red)] transition-colors'
                                    >
                                        Partners
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/team'
                                        className='text-gray-400 hover:text-[var(--color-tedx-red)] transition-colors'
                                    >
                                        Team
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/contact'
                                        className='text-gray-400 hover:text-[var(--color-tedx-red)] transition-colors'
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
                            <div className='flex gap-4'>
                                <button
                                    onClick={() => window.open('#instagram', '_blank')}
                                    className='p-2 bg-gray-800 rounded-full hover:bg-[var(--color-tedx-red)] transition-colors'
                                >
                                    <Instagram className='w-5 h-5' />
                                </button>

                                <button
                                    onClick={() => window.open('#linkedin', '_blank')}
                                    className='p-2 bg-gray-800 rounded-full hover:bg-[var(--color-tedx-red)] transition-colors'
                                >
                                    <Linkedin className='w-5 h-5' />
                                </button>

                                <button
                                    onClick={() => window.open('#youtube', '_blank')}
                                    className='p-2 bg-gray-800 rounded-full hover:bg-[var(--color-tedx-red)] transition-colors'
                                >
                                    <Youtube className='w-5 h-5' />
                                </button>

                                <button
                                    onClick={() => window.open('#twitter', '_blank')}
                                    className='p-2 bg-gray-800 rounded-full hover:bg-[var(--color-tedx-red)] transition-colors'
                                >
                                    <Twitter className='w-5 h-5' />
                                </button>
                            </div>

                            <div className='mt-6 space-y-2'>
                                <p className='text-gray-400'>Contact Us</p>
                                <p className='text-sm text-gray-500'>tedx@nits.ac.in</p>
                                <p className='text-sm text-gray-500'>+91 98765 43210</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
                        <p className='text-gray-500 text-sm'>© 2026 TEDxNITSilchar. All rights reserved.</p>

                        <div className='flex gap-6 text-sm'>
                            <button
                                onClick={() => window.open('#privacy', '_blank')}
                                className='text-gray-500 hover:text-white transition-colors'
                            >
                                Privacy Policy
                            </button>
                            <button
                                onClick={() => window.open('#terms', '_blank')}
                                className='text-gray-500 hover:text-white transition-colors'
                            >
                                Terms of Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};