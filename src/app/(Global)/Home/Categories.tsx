import { Grid, Navigation } from 'swiper/modules';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Coins, Gift, Gamepad2, AppWindow, CreditCard, Package, User } from "lucide-react";
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import Link from 'next/link';

const categories = [
    { icon: User, label: "Accounts", href: "/accounts" },
    { icon: Gamepad2, label: "Games", href: "/games" },
    { icon: AppWindow, label: "Software & Apps", href: "/software" },
    { icon: Coins, label: "Game coins", href: "/game-coins" },
    { icon: Gift, label: "Gift Cards", href: "/gift-cards" },
    { icon: Package, label: "Items", href: "/items" },
    { icon: CreditCard, label: "Payment Cards", href: "/payment-cards" },
];

export default function Categories() {
    return (
        <div className="my-2 border-y border-[var(--border)]">
            <Swiper
                modules={[Grid, Navigation]}
                navigation={true}
                grid={{ rows: 1, fill: 'row' }}
                spaceBetween={20}
                slidesPerView={6}
                className="categories-swiper py-4"
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={category.href}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 group"
                            >
                                <div className="p-3 rounded-xl">
                                    <category.icon
                                        className="w-10 h-10 text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]"
                                    />
                                </div>
                                <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] text-center">
                                    {category.label}
                                </span>
                            </Link>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
