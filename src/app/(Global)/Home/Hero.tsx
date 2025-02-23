import React, { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion";
import { Trophy, Star, Shield, Gamepad2, Dice1, Swords, Target, Ghost, Crown, Sword, Coins, Gift, AppWindow, CreditCard, Package, User } from "lucide-react";
import Link from 'next/link';

export default function HomeHero() {

    const [floatingIcons, setFloatingIcons] = useState<Array<{
        icon: React.ReactNode;
        top: number;
        left: number;
        color: string;
        animation: any;
    }>>([]);

    const lucideIcons = [
        <Gamepad2 key="gamepad2" />, <Dice1 key="dice" />, <Trophy key="trophy" />,
        <Swords key="swords" />, <Shield key="shield" />, <Star key="star" />,
        <Target key="target" />, <Ghost key="ghost" />, <Crown key="crown" />
    ];

    const lucideIconsColors = [
        'text-[var(--accent-primary)]',
        'text-[var(--accent-secondary)]',
        'text-[var(--text-primary)]',
        'text-[var(--text-secondary)]',
        'text-[var(--gradient-start)]',
        'text-[var(--gradient-end)]'
    ];

    useEffect(() => {
        const icons = lucideIcons
            .sort(() => Math.random() - 0.5)
            .map(icon => ({
                icon,
                top: Math.random() * 100,
                left: Math.random() * 100,
                color: lucideIconsColors[Math.floor(Math.random() * lucideIconsColors.length)],
                animation: {
                    x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
                    y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
                    rotate: [0, Math.random() * 360, 0],
                    scale: [1, 1 + Math.random() * 0.5, 1],
                    opacity: [0.3, Math.random(), 0.3]
                }
            }));
        setFloatingIcons(icons);
    }, []);

    return (
        <section className="relative flex flex-col justify-center overflow-hidden pt-[56px]">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-70">
                {floatingIcons.map((iconData, index) => (
                    <motion.div
                        key={index}
                        className={`absolute ${iconData.color}`}
                        style={{ top: `${iconData.top}%`, left: `${iconData.left}%` }}
                        animate={iconData.animation}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                    >
                        {iconData.icon}
                    </motion.div>
                ))}
            </div>

            {/* Main content */}
            <div className="relative container mx-auto px-4 h-full flex items-center z-[3]">
                <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                            <span className="text-[var(--text-primary)]">DUAL</span><br />
                            <span className="text-[var(--text-primary)]">PLAYER</span><br />
                            <span className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-transparent bg-clip-text">
                                CHALLENGE
                            </span>
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] mb-6">
                            LIVE, PLAY THE <span className="text-[var(--accent-secondary)]">GAME</span>, AND LEAD
                        </p>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-square max-w-[400px] mx-auto rounded-full border-4 border-[var(--accent-primary)]/50 p-2">
                            <div className="absolute inset-0 rounded-full border-4 border-[var(--accent-secondary)]/50" />
                            <img
                                src="https://img.freepik.com/free-photo/gaming-setup-with-controller-headphones_23-2149829139.jpg"
                                alt="Gaming Controller"
                                className="w-full h-full rounded-full object-cover"
                            />
                            {/* Glowing Effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 blur-xl" />
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    )
}
