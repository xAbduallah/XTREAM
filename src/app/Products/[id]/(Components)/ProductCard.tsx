import React from 'react'
import FormatDate from '@/Utils/FormatDate'
import { IProduct } from '@/Interfaces/Products'
import { Box, Clock, DollarSign, Heart, Loader2, ShoppingCart, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProductCard({ product, isSeller, onDelete }: { product: IProduct, isSeller: boolean, onDelete: () => void }) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking on action buttons
        if ((e.target as HTMLElement).closest('button')) {
            e.stopPropagation();
            return;
        }
        router.push(`/Products/${product.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="group bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] hover:shadow-md transition-all duration-300 hover:border-[var(--accent-primary)]/20 cursor-pointer">
            <div className="p-3 flex items-center gap-4">
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-[var(--text-primary)] text-base group-hover:text-[var(--accent-primary)] transition-colors truncate">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[var(--text-secondary)] text-xs">
                            <Clock className="w-3 h-3" />
                            <span>{FormatDate(product.createdAt).timeAgo}</span>
                        </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                        {product.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 shrink-0">
                    {product.salesCount > 0 && (
                        <div className="flex items-center gap-1">
                            <ShoppingCart className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-[var(--text-secondary)]">
                                {product.salesCount}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <Box className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-[var(--text-secondary)]">
                            {product.stockQuantity}
                        </span>
                    </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center gap-3 shrink-0 pl-4 border-l border-[var(--border)]">
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-base font-semibold text-[var(--text-primary)]">
                            {product.price}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-[var(--bg-tertiary)] rounded-md transition-colors">
                            <Heart 
                                className="w-4 h-4 text-[var(--text-secondary)] hover:text-red-500 transition-colors"
                                fill={false ? 'currentColor' : 'none'}
                            />
                        </button>
                        {isSeller && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete();
                                }}
                                className="p-1.5 hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-red-500 rounded-md transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
