import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserState } from '@/Interfaces/User';

const initialState: UserState = {
    user: null,
    requestState: {
        register: { isLoading: false, success: false, message: null },
        doLogin: { isLoading: false, success: false, message: null },
        verifyUserToken: { isLoading: false, success: false, message: null },
    }
};

export const register = createAsyncThunk('users/register', async (values: any, { rejectWithValue }) => {
    try {
        console.log(values);

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, values);
        if (data.success) {
            Cookies.set('token', data.user?.token);
        }
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Register: Something went wrong");
    }
});

export const doLogin = createAsyncThunk('users/doLogin', async (values: any, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, values);
        if (data.success) {
            Cookies.set('token', data.user?.token);
        }
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Login: Something went wrong");
    }
});

export const verifyUserToken = createAsyncThunk('users/verifyUserToken', async (token: string, { rejectWithValue }) => {
    try {
        if (!token) {
            return rejectWithValue("No token provided");
        }
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
            Token: token
        });

        if (data.success) {
            Cookies.set('token', data.user?.token);
        }
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to verify user token. Please login again.");
    }
});

export const getUser = createAsyncThunk('users/getUser', async (userId: string, { rejectWithValue }) => {
    try {
        if (!userId) {
            return rejectWithValue("getUser: No userId provided");
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || `Failed to get user with id: ${userId}`);
    }
});

function InitRegisterReducer(builder: any) {
    builder.addCase(register.pending, (state: any) => {
        state.requestState["register"] = { isLoading: true, success: false, message: null };
    }).addCase(register.fulfilled, (state: any, action: any) => {
        state.requestState['register'] = {
            isLoading: false,
            success: action.payload.success,
            message: action.payload.message
        };
    }).addCase(register.rejected, (state: any, action: any) => {
        state.requestState['register'] = {
            isLoading: false,
            success: false,
            message: action.payload.message
        };
    });
}

function InitLoginReducer(builder: any) {
    builder.addCase(doLogin.pending, (state: any) => {
        state.requestState["doLogin"] = { isLoading: true, success: false, message: null };
    }).addCase(doLogin.fulfilled, (state: any, action: any) => {
        state.requestState['doLogin'] = {
            isLoading: false,
            success: action.payload.success,
            message: action.payload.message
        };
        if (action.payload.success) {
            state.user = action.payload.user;
        }
    }).addCase(doLogin.rejected, (state: any, action: any) => {
        state.requestState['doLogin'] = {
            isLoading: false,
            success: false,
            message: action.payload.message
        };
    });
}

function InitVerifyTokenReducer(builder: any) {
    builder
        .addCase(verifyUserToken.pending, (state: any) => {
            state.isLoading = true;
        }).addCase(verifyUserToken.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            if (action.payload.success) {
                state.user = action.payload.user;
                state.message = action.payload.message;
            }
        }).addCase(verifyUserToken.rejected, (state: any, action: any) => {
            state.isLoading = true;
            state.message = action.payload.message;
        });
}

export const userServices = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state) => {
            Cookies.remove("token");
            state.user = null;
        },
        destroyUser: (state) => {
            state.user = null;
        },
        clearState: (state, action) => {
            console.log(action.payload);
            state.requestState[action.payload] = { isLoading: false, success: false, message: null };
        }
    },
    extraReducers: (builder) => {
        InitLoginReducer(builder);
        InitRegisterReducer(builder);
        InitVerifyTokenReducer(builder);
    },
});

export const userActions = userServices.actions;
export default userServices.reducer;
