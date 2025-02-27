import { ICategory } from '@/Interfaces/Category';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://localhost:7071/api/categories';

// Helper function to get token
const getAuthHeaders = () => {
    const token = Cookies.get('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Thunks for async actions
export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL, { headers: getAuthHeaders() });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
});

export const fetchCategory = createAsyncThunk('categories/fetchOne', async (id: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch category');
    }
});

export const createCategory = createAsyncThunk('categories/create', async (category: ICategory, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, category, { headers: getAuthHeaders() });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to create category');
    }
});

export const updateCategory = createAsyncThunk('categories/update', async ({ id, category }: { id: string, category: ICategory }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, category, { headers: getAuthHeaders() });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to update category');
    }
});

export const deleteCategory = createAsyncThunk('categories/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to delete category');
    }
});

// Category slice
export const categoryServices = createSlice({
    name: 'categories',
    initialState: {
        categories: [] as ICategory[],
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) state.categories[index] = action.payload;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                // state.categories = state.categories.filter((cat: ICategory) => cat.id !== action.payload);
            });
    }
});

export default categoryServices.reducer;
