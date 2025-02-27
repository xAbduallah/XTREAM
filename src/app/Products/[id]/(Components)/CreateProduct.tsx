'use client'
import React, { useEffect } from 'react'
import { X, SquarePlus } from 'lucide-react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { createProduct } from '@/lib/productServices'
import InputField from '@/Utils/InputField'
import { fetchCategories } from '@/lib/categoryServices'

interface CreateProductProps {
    onClose: () => void;
}

export default function CreateProduct({ onClose }: CreateProductProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.productService);
    const { categories, loading: categoriesLoading } = useSelector((state: RootState) => state.categoryServices);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const initialValues = {
        name: '',
        description: '',
        price: '',
        categoryId: '',
        stockQuantity: ''
    };

    const formInputs = [
        {
            id: 'name',
            name: 'Product Name',
            type: 'text',
        },
        {
            id: 'description',
            name: 'Description',
            type: 'textarea',
            maxLength: 1200,
        },
        {
            id: 'price',
            name: 'Price',
            type: 'number',
        },
        {
            id: 'categoryId',
            name: 'Category',
            type: 'select',
            options: categories.map(cat => ({
                value: String(cat.id),
                label: cat.name,
                displayValue: cat.name
            }))
        },
        {
            id: 'stockQuantity',
            name: 'Stock Quantity',
            type: 'number',
        }
    ];

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
        description: Yup.string()
            .min(10, 'Description must be at least 10 characters')
            .max(1200, 'Description must be at maximum 1200 characters')
            .required('Description is required'),
        price: Yup.number()
            .min(0, 'Price must be greater than 0')
            .required('Price is required'),
        categoryId: Yup.string()
            .required('Category is required'),
        stockQuantity: Yup.number()
            .min(0, 'Stock quantity must be greater than 0')
            .required('Stock quantity is required')
    });

    const handleSubmit = async (values: any) => {
        const response = await dispatch(createProduct({
            ...values,
            price: Number(values.price),
            categoryId: Number(values.categoryId),
            stockQuantity: Number(values.stockQuantity)
        }));

        if (response.meta.requestStatus === 'fulfilled') {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--bg-secondary)] rounded-2xl w-full max-w-md relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-green-400/10">
                            <SquarePlus className="w-6 h-6 text-green-400" />
                        </div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">
                            Add New Product
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--bg-tertiary)] rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-[var(--text-primary)]" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="space-y-6">
                                {formInputs.map((input) => (
                                    <InputField
                                        key={input.id}
                                        id={input.id}
                                        name={input.name}
                                        type={input.type}
                                        options={input.options}
                                    />
                                ))}

                                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 py-2 px-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)]/70 transition-colors">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || !isValid || !dirty}
                                        className="flex-1 py-2 px-4 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:hover:bg-green-400 disabled:cursor-not-allowed">
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                <span>Creating...</span>
                                            </div>
                                        ) : (
                                            'Create Product'
                                        )}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
