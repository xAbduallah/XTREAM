'use client'
import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { User, Sun, Moon, Menu, X, Search, Bell, ShoppingCart } from 'lucide-react';
import { InitializerContext } from '@/Context/AppInitializer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const context = useContext(InitializerContext);
    const { darkMode, toggleDarkMode } = context || { darkMode: false, toggleDarkMode: () => { } };
    const { user } = useSelector((state: any) => state.userCache);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-lg py-2.5">
            <div className="container mx-auto px-4">
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
                            <Link href="/User/Profile" className="flex items-center gap-2">
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="h-8 w-8 rounded-full object-cover ring-2 ring-[var(--border)]"
                                />
                            </Link>
                        ) : (
                            <Link
                                href="/Auth/Login"
                                className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg 
                                         hover:bg-[var(--accent-primary-hover)] transition-colors"
                            >
                                Sign In
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-[var(--text-primary)]" />
                            ) : (
                                <Menu className="w-6 h-6 text-[var(--text-primary)]" />
                            )}
                        </button>
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
                                className="w-full px-4 py-2 rounded-full text-sm bg-[var(--bg-secondary)]
                                         border border-[var(--border)] text-[var(--text-primary)]
                                         placeholder-[var(--text-secondary)] focus:outline-none
                                         focus:ring-2 focus:ring-[var(--accent-primary)]"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5
                                           bg-[var(--accent-primary)] rounded-full
                                           hover:bg-[var(--accent-primary-hover)] transition-colors">
                                <Search className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-[var(--bg-primary)] border-t border-[var(--border)]"
                    >
                        <div className="container mx-auto px-4 py-4">
                            {!user && (
                                <div className="pt-4 flex flex-col space-y-4">
                                    <Link
                                        href="/Auth/Register"
                                        className="block text-center px-4 py-2 bg-[var(--accent-primary)] 
                                                 text-white rounded-lg hover:bg-[var(--accent-primary-hover)] 
                                                 transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}