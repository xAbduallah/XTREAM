'use client'
import 'swiper/css';
import Link from 'next/link';
import { useRef } from 'react';
import { motion } from "framer-motion";
import { TrendingUp } from 'lucide-react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function TrendingGames() {
    const swiperRef = useRef<SwiperType | null>(null);

    const featuredGames = [
        {
            id: 1,
            title: "Cyberpunk 2077",
            image: "https://wallpapercave.com/uwp/uwp4228507.jpeg",
            offers: "2.5K"
        },
        {
            id: 2,
            title: "Red Dead Redemption 2",
            image: "https://wallpapercave.com/uwp/uwp4498619.jpeg",
            offers: "3.2K"
        },
        {
            id: 3,
            title: "The Witcher 3",
            image: "https://wallpapercave.com/wp/wp6267694.jpg",
            offers: "1.8K"
        },
        {
            id: 4,
            title: "GTA V",
            image: "https://wallpapercave.com/wp/wp12657125.jpg",
            offers: "4.1K"
        },
        {
            id: 5,
            title: "Elden Ring",
            image: "https://wallpapercave.com/wp/wp12636656.png",
            offers: "2.9K"
        },
        {
            id: 6,
            title: "Pubg Mobile",
            image: "https://wallpapercave.com/uwp/uwp4312569.jpeg",
            offers: "2.3K"
        },
        {
            id: 7,
            title: "Horizon Zero Dawn",
            image: "https://wallpapercave.com/dwp1x/wp14962875.webp",
            offers: "1.9K"
        },
        {
            id: 8,
            title: "Spider-Man",
            image: "https://wallpapercave.com/uwp/uwp4611426.jpeg",
            offers: "2.7K"
        }
    ];

    return (
        <section className="py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-[var(--text-primary)] mb-12">
                    Trending Games
                </h2>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={24}
                    slidesPerView="auto"
                    loop={true}
                    speed={10000}
                    autoplay={{ delay: 0, pauseOnMouseEnter: true }}
                    allowTouchMove={true}
                    className="cursor-pointer">
                    {featuredGames.map((game, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: "300px" }}
                            className="relative flex-shrink-0"
                        >
                            <motion.a
                                href={`/game/${game.id}`}
                                className="block relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10"
                                whileHover={{ scale: 1.01 }}
                            >
                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                                    <h3 className="text-lg font-semibold">{game.title}</h3>
                                    <p className="text-sm opacity-80">{game.offers} offers available</p>
                                </div>
                            </motion.a>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Link
                    href="/games"
                    className="flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--text-tertiary)] transition-colors mt-8"
                >
                    Discover all
                    <TrendingUp className="w-5 h-5 ml-2" />
                </Link>
            </div>
        </section>
    );
}
