import { IProduct } from '@/Interfaces/Products';
import Loader from '@/Utils/Loader';
import { Package, SquarePlus } from 'lucide-react';
import React, { useState } from 'react'
import DeleteProduct from './DeleteProduct';
import ProductCard from './ProductCard';

export default function ProductList({ products, loading, isSeller, sellerId, onAddProduct }: { products: IProduct[], loading: boolean, isSeller: boolean, sellerId: string, onAddProduct: () => void }) {
    const [deletingProduct, setDeletingProduct] = useState<IProduct | null>(null);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!products?.length) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                <Package className="w-16 h-16 text-[var(--text-secondary)]/30" />
                <div className="text-center">
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">No Products Yet</h2>
                    <p className="text-[var(--text-secondary)]">
                        {isSeller ? "Start by adding your first product!" : "This seller hasn't added any products yet."}
                    </p>
                </div>
                {isSeller && (
                    <button
                        onClick={onAddProduct}
                        className="mt-4 group flex items-center gap-2 bg-[var(--bg-secondary)] hover:bg-green-400/10 border-2 border-green-400/20 hover:border-green-400/30 rounded-xl px-6 py-3 transition-all duration-300 cursor-pointer">
                        <SquarePlus className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        <span className="text-green-400 font-medium">Add your first product</span>
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className='flex items-center gap-3'>
                    <div className="p-2 rounded-xl bg-[var(--bg-tertiary)]">
                        <Package className="w-6 h-6 text-[var(--text-secondary)]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">{products.length} Products</h2>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {isSeller ? "Manage your products" : "Browse products"}
                        </p>
                    </div>
                </div>
                {isSeller && (
                    <button
                        onClick={onAddProduct}
                        className="group flex items-center gap-2 bg-[var(--bg-secondary)] hover:bg-green-400/10 border-2 border-green-400/20 hover:border-green-400/30 rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer">
                        <SquarePlus className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                        <span className="text-green-400 font-medium">Add new product</span>
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-2">
                {products.map((product: IProduct) => (
                    <ProductCard key={product.id} product={product} isSeller={isSeller} onDelete={() => setDeletingProduct(product)} />
                ))}
            </div>

            {deletingProduct != null && <DeleteProduct product={deletingProduct} onClose={() => setDeletingProduct(null)} />}
        </div>
    );
}