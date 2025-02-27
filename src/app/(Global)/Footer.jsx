'use client'
import Link from 'next/link'
import { Mail } from 'lucide-react'

const Footer = () => {
    const footerLinks = {
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Community', href: '/community' },
        ],
        legal: [
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Cookie Policy', href: '/cookies' },
        ],
    }

    return (
        <footer className="max-w-[1200px] mx-auto bg-[var(--bg-secondary)]/80 backdrop-blur-sm border-t border-[var(--border)]">
            <div className="container mx-auto px-4">
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">About XTREAM</h3>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Your trusted platform for gaming accounts, items, and services.
                        </p>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-lg font-semibold capitalize text-[var(--text-primary)] mb-4">
                                {category}
                            </h3>
                            <ul className="space-y-2">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <Link 
                                            href={link.href} 
                                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] 
                                                     transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Newsletter</h3>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] 
                                         border border-[var(--border)] text-[var(--text-primary)] 
                                         focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
                            />
                            <button className="p-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] 
                                           rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[var(--border)]">
                    <div className="container py-6 text-center text-sm text-[var(--text-secondary)]">
                        <p>© {new Date().getFullYear()} XTREAM. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
