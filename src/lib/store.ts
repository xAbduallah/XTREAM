import { categoryServices } from './categoryServices';
import { productService } from './productServices';
import { productApi } from './productServices2';
import { userServices } from './userServices';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        userServices: userServices.reducer,
        categoryServices: categoryServices.reducer,
        productService: productService.reducer,
        productApi: productApi.reducer
    },
    middleware: (middleware) => middleware().concat(productApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch