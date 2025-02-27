import { IPagedResult, IProduct, IProductFilter } from '@/Interfaces/Products';
import { IRequestState } from '@/Interfaces/User';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const getAuthHeaders = () => {
    const token = Cookies.get('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Async Thunks
export const createProduct = createAsyncThunk(
    'products/create',
    async (product: { name: string; description: string; price: number; categoryId: number; stockQuantity: number },
        { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, product,
                { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to create product");
        }
    }
);

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (filter: IProductFilter) => {
    const response = await axios.get<IPagedResult<IProduct>>(`${process.env.NEXT_PUBLIC_API_URL}/products`, { params: filter });
    return response.data;
}
);

export const getProductById = createAsyncThunk('products/getProductById', async (id: number) => {
    const response = await axios.get<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    return response.data;
}
);

export const getSellerProducts = createAsyncThunk('products/getSellerProducts', async (sellerId: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/seller/${sellerId}`);
        return { products: response.data, sellerId };
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, product }: { id: number; product: Partial<IProduct> }) => {
    const response = await axios.put<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, product);
    return response.data;
}
);
export const deleteProduct = createAsyncThunk('products/delete', async (id: number) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { headers: getAuthHeaders() });
    return id;
});

interface ProductState {
    sellerProducts: IPagedResult<IProduct>;
    selectedProduct: IProduct | null;
    loading: boolean;
    error: string | null;
    currentSellerId: string | null;
    requestState: Record<string, IRequestState>;
}

const initialState: ProductState = {
    sellerProducts: {
        items: [],
        totalItems: 0,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false
    },
    selectedProduct: null,
    loading: false,
    error: null,
    currentSellerId: null,
    requestState: {
        deleteProduct: { isLoading: false, success: false, message: null }
    }
};

export const productService = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSellerProducts: (state) => {
            state.sellerProducts = {
                items: [],
                totalItems: 0,
                pageNumber: 1,
                pageSize: 10,
                totalPages: 0,
                hasPreviousPage: false,
                hasNextPage: false
            };
            state.currentSellerId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerProducts = action.payload.products;
            })
            // Fetch Products
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })

            // Fetch Single Product
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch product';
            })

            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerProducts.items.unshift(action.payload);
                state.sellerProducts.totalItems++;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                console.log(action);
                state.error = action.error.message || 'Failed to create product';
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.sellerProducts.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.sellerProducts.items[index] = action.payload;
                }
                if (state.selectedProduct?.id === action.payload.id) {
                    state.selectedProduct = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update product';
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state, action) => {
                state.requestState['deleteProduct'] = { isLoading: false, success: false, message: null }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerProducts.items = state.sellerProducts.items.filter(p => p.id !== action.payload);
                state.sellerProducts.totalItems--;
                if (state.selectedProduct?.id === action.payload) {
                    state.selectedProduct = null;
                }
            });
    }
});

export const productsActions = productService.actions;
export default productService.reducer;