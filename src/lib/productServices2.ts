import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPagedResult, IProduct, IProductFilter } from '@/Interfaces/Products';
import { ICategory } from '@/Interfaces/Category';
import Cookies from 'js-cookie';

// Get auth headers
const getAuthHeaders = () => {
    const token = Cookies.get('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Define API Service
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    tagTypes: ['Products', 'getSellerProducts'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IPagedResult<IProduct>, IProductFilter>({
            query: (filter) => ({ url: '/products', params: filter }),
        }),
        getProductById: builder.query<IProduct, number>({
            query: (id) => `/products/${id}`,
        }),
        getCategoryById: builder.query<ICategory, number>({
            query: (id) => `/categories/${id}`,
        }),
        getSellerProducts: builder.query<IPagedResult<IProduct>, string>({
            query: (sellerId) => `/products/seller/${sellerId}`,
            keepUnusedDataFor: 120,
            providesTags: (result, error, sellerId) => [{ type: 'getSellerProducts' as const, id: sellerId }],
        }),
        createProduct: builder.mutation<IProduct, Omit<IProduct, 'id'>>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
                headers: getAuthHeaders(),
            }),
        }),
        updateProduct: builder.mutation<IProduct, { id: number; product: Partial<IProduct> }>({
            query: ({ id, product }) => ({
                url: `/products/${id}`,
                method: 'PUT',
                body: product,
                headers: getAuthHeaders(),
            }),
        }),
        deleteProduct: builder.mutation<number, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
                headers: getAuthHeaders(),
            }),
            invalidatesTags: (result, error) => [{ type: 'getSellerProducts' }],
        }),
    }),
});

// Export Hooks
export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetCategoryByIdQuery,
    useGetSellerProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;

// Add this reducer in your store
export default productApi.reducer;
