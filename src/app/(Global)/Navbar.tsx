'use client'
import React, { useContext, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { User, Sun, Moon, Menu, X, Search, Bell, ShoppingCart, User2, LogOut, Settings, UserCircle, CircleAlert, TriangleAlert } from 'lucide-react';
import { InitializerContext } from '@/Context/AppInitializer';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '@/lib/store';
import { userActions } from '@/lib/userServices';
import { useRouter } from 'next/navigation';

const userMenu = [
    {
        label: 'Profile',
        href: '/User/Profile',
        icon: <UserCircle className="w-4 h-4" />
    },
    {
        label: 'Settings',
        href: '/User/Settings',
        icon: <Settings className="w-4 h-4" />
    }
]

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const context = useContext(InitializerContext);
    const { darkMode, toggleDarkMode } = context || { darkMode: false, toggleDarkMode: () => { } };
    const { user } = useSelector((state: RootState) => state.userServices);
    const dispatch = useDispatch();
    const { push } = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-lg py-2.5">
            <div className="container max-w-[1200px] mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-3xl font-bold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-transparent bg-clip-text">
                            XTREAM
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:block flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for games, items, or services..."
                                className="w-full px-3 py-3 rounded-full text-sm bg-[var(--bg-secondary)] 
                                         border border-[var(--border)] text-[var(--text-primary)] 
                                         placeholder-[var(--text-secondary)] focus:outline-none 
                                         focus:ring-2 focus:ring-[var(--accent-primary)]"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 
                                           bg-[var(--accent-primary)] rounded-full 
                                           hover:bg-[var(--accent-secondary)] transition-colors">
                                <Search className="w-4 h-4 text-[var(--text-primary)]" />
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Search Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5 text-[var(--text-primary)]" />
                        </button>

                        <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-[var(--text-primary)]" />
                        </button>
                        <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors">
                            <ShoppingCart className="w-5 h-5 text-[var(--text-primary)]" />
                        </button>
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5 text-[var(--text-primary)]" />
                            ) : (
                                <Moon className="w-5 h-5 text-[var(--text-primary)]" />
                            )}
                        </button>

                        {/* User Menu */}
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-2 hover:bg-[var(--gradient-start)]/30 rounded-full transition-colors">
                                        <User2 className="h-9 w-9 rounded-full object-cover p-1" />
                                    </button>
                                    {!user.isVerified && <CircleAlert  className='absolute top-0 right-0 w-5 h-5 text-red-600/70'/>}
                                </div>

                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[var(--bg-secondary)]/70 border border-[var(--border)] shadow-lg py-1 z-50">

                                        <div className="px-4 py-3 border-b border-[var(--border)]">
                                            <p className="text-sm font-medium text-[var(--text-primary)]">{user.username}
                                                {!user.isVerified ? <span className='text-xs text-red-600'> Not Verified</span> : <span className='text-xs text-green-600'> Verified</span>}</p>
                                            <p className="text-xs text-[var(--text-secondary)]">{user.email}</p>
                                        </div>

                                        {userMenu.map((item) => (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                            >
                                                <Link href={item.href === "/User/Profile" ? `/User/${user.id}` : item.href} onClick={() => { setIsProfileOpen(false) }}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                                                    {item.icon}
                                                    {item.label}
                                                </Link>
                                            </motion.div>
                                        ))}

                                        <div className="py-1">
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                            >
                                                <button onClick={() => { dispatch(userActions.logoutUser()); setIsProfileOpen(false); push('/'); }}
                                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[var(--bg-tertiary)] transition-colors">
                                                    <LogOut className="w-4 h-4" />
                                                    Sign out
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/Auth/Login" className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-xl overflow-hidden bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:scale-[1.02] shadow-md hover:shadow-[var(--accent-primary)]/20 transition-all duration-300">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)] opacity-0 group-hover:opacity-100 translate-x-[100%] group-hover:translate-x-[-100%] transition-all duration-700" />
                                <span className="relative flex items-center gap-2 text-sm font-medium text-white">
                                    <User className="w-4 h-4" />
                                    Sign In
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden border-t border-[var(--border)] p-4 bg-[var(--bg-primary)]"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for games, items, or services..."
                                className="w-full px-4 py-2 rounded-full text-sm bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[var(--accent-primary)] rounded-full hover:bg-[var(--accent-primary-hover)] transition-colors">
                                <Search className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}