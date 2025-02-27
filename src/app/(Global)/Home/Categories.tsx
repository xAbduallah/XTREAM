import Link from 'next/link';
import { motion } from "framer-motion";
import React, { useEffect } from 'react'
import { AppDispatch } from '@/lib/store';
import { ICategory } from '@/Interfaces/Category';
import { Grid, Navigation } from 'swiper/modules';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchCategories } from '@/lib/categoryServices';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/Utils/Loader';

export default function Categories() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const { categories, loading } = useSelector((state: any) => state.categoryServices);

    return (
        <div className="my-2 border-y border-[var(--border)]">
            {loading ? <div className='py-6'><Loader size='lg' /></div> : categories.length > 0 &&
                <Swiper
                    modules={[Grid, Navigation]}
                    navigation={true}
                    grid={{ rows: 1, fill: 'row' }}
                    spaceBetween={20}
                    slidesPerView={6}
                    className="categories-swiper py-4"
                >
                    {categories.map((category: ICategory, index: number) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/Products/${category.id}`}
                                    className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 group"
                                >
                                    <div className="p-3 rounded-xl">
                                        <DynamicIcon name={category.icon as any}
                                            className="w-10 h-10 text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] text-center">
                                        {category.name}
                                    </span>
                                </Link>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            }
        </div>
    )
}
