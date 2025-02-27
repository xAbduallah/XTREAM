import React from 'react'
import { AlertTriangle, Loader2, XCircle } from "lucide-react";
import { IProduct } from '@/Interfaces/Products';
import { productApi } from '@/lib/productServices2';

interface DeleteProps {
    product: IProduct;
    onClose: () => void;
}

export default function DeleteProduct({ product, onClose }: DeleteProps) {
    const [deleteProduct, { isLoading, error }] = productApi.useDeleteProductMutation();

    async function handleDelete() {
        try {
            await deleteProduct(product.id);
            onClose();
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
            <div className="bg-[var(--bg-secondary)] rounded-xl shadow-lg p-6 w-full max-w-md mx-4 border border-[var(--border)]">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="p-3 bg-red-500/10 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Delete Product</h2>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Are you sure you want to delete <span className="font-medium text-[var(--text-primary)]">{product.name}</span>? 
                            This action cannot be undone.
                        </p>
                    </div>

                    {error && (
                        <div className="w-full p-3 bg-red-500/10 rounded-lg text-sm text-red-500">
                            Failed to delete product. Please try again.
                        </div>
                    )}

                    <div className="flex items-center gap-3 w-full mt-2">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 py-2 px-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)]/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isLoading}
                            className="flex-1 py-2 px-4 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
