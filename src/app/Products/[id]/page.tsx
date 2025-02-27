'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { productApi } from '@/lib/productServices2'
import Loader from '@/Utils/Loader'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import ProductDetails from './(Components)/ProductDetails'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.userServices);
    const { id } = React.use(params);
    
    const { data: product, isLoading, error } = productApi.useGetProductByIdQuery(
        parseInt(id)
    );

    const { data: categoryData } = productApi.useGetCategoryByIdQuery(
        product?.categoryId || 0,
        { skip: !product }
    );

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Product not found</h2>
                <p className="text-[var(--text-secondary)]">The product you're looking for doesn't exist or has been removed.</p>
                <button
                    onClick={() => router.back()}
                    className="text-[var(--accent-primary)] hover:underline"
                >
                    Go back
                </button>
            </div>
        );
    }

    return (
        <ProductDetails
            product={product}
            isSeller={user?.id === product.sellerId}
            categoryName={categoryData?.name || null}
            onBack={() => router.back()}
            onEdit={() => router.push(`/products/${product.id}/edit`)}
        />
    );
}
