import { IProduct } from '@/Interfaces/Products'
import React, { useState } from 'react'
import { ArrowLeft, Box, Clock, DollarSign, Edit2, Heart, Package2, ShoppingBag, ShoppingCart, Star, Trash2, Share2, Info, CreditCard, Plus } from 'lucide-react'
import FormatDate from '@/Utils/FormatDate'
import DeleteProduct from './DeleteProduct'

interface ProductDetailsProps {
    product: IProduct
    isSeller?: boolean
    onBack?: () => void
    onEdit?: () => void
    categoryName: string | null
}

export default function ProductDetails({ product, isSeller = false, onBack, onEdit, categoryName }: ProductDetailsProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [isLiked, setIsLiked] = useState(false)

    const handleQuantityChange = (value: number) => {
        if (value >= 1 && value <= product.stockQuantity) {
            setQuantity(value)
        }
    }

    const handleShare = async () => {
        try {
            await navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
            });
        } catch (err) {
            console.error('Share failed:', err);
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            {/* Navigation and Actions Bar */}
            <div className="flex items-center justify-between mb-8 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border)]">
                <button onClick={onBack}
                    className="flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)] cursor-pointer">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to products</span>
                </button>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors cursor-pointer">
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                    {isSeller && (
                        <>
                            <button
                                onClick={onEdit}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)]/10 hover:bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] transition-colors cursor-pointer"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                                onClick={() => setIsDeleting(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Delete</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Product Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Product Header */}
                    <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)]">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <h1 className="text-lg font-bold text-[var(--text-primary)] leading-tight">{product.name}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-[var(--text-secondary)]">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm">{FormatDate(product.createdAt).timeAgo}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm">{product.rating.toFixed(1)} rating</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Box className="w-4 h-4 text-purple-400" />
                                        {categoryName && <span className="text-sm">{categoryName}</span>}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg transition-colors cursor-pointer">
                                <Heart
                                    className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-[var(--text-secondary)]'} transition-colors`}
                                    fill={isLiked ? 'currentColor' : 'none'}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)]">
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Description</h2>
                        <div className="prose prose-sm max-w-none text-[var(--text-secondary)] whitespace-pre-line">
                            <span>{product.description}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Purchase Info */}
                <div className="space-y-4">
                    <div className="bg-[var(--bg-secondary)] p-6 rounded-xl border border-[var(--border)] sticky top-25">
                        <div className="space-y-6">
                            {/* Price */}
                            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                                <div>
                                    <div className="text-sm text-[var(--text-secondary)]">Price</div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-6 h-6 text-green-400" />
                                        <span className="text-3xl font-bold text-[var(--text-primary)]">{product.price}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="px-3 py-1 rounded-full bg-blue-400/10 text-blue-400 text-sm flex items-center gap-1.5">
                                        <Package2 className="w-4 h-4" />
                                        <span>{product.stockQuantity} in stock</span>
                                    </div>
                                    {product.salesCount > 0 && (
                                        <div className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-sm flex items-center gap-1.5">
                                            <ShoppingCart className="w-4 h-4" />
                                            <span>{product.salesCount} sales</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {product.stockQuantity > 0 && (
                                <>
                                    {/* Quantity Selector */}
                                    <div className="space-y-3">
                                        <label className="text-sm text-[var(--text-secondary)]">Quantity</label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                                disabled={quantity <= 1}
                                                className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] 
                                                         hover:text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                                min={1}
                                                max={product.stockQuantity}
                                                className="w-20 text-center p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-none"
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                                disabled={quantity >= product.stockQuantity}
                                                className="p-3 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total and Add to Cart */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[var(--text-secondary)]">Subtotal</span>
                                            <span className="text-lg font-semibold text-[var(--text-primary)]">
                                                ${(product.price * quantity).toFixed(2)}
                                            </span>
                                        </div>
                                        <button className="w-full py-2 px-6 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/90 text-white rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                            <CreditCard className="w-5 h-5" />
                                            <span>Buy</span>
                                        </button>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="pt-4 border-t border-[var(--border)]">
                                        <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                            <Info className="w-4 h-4 mt-0.5" />
                                            <p>Free shipping on orders over $50. 30-day return policy.</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isDeleting && (
                <DeleteProduct
                    product={product}
                    onClose={() => setIsDeleting(false)}
                />
            )}
        </div>
    )
}
