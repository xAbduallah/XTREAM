'use client'
import { AppDispatch } from '@/lib/store';
import { verifyUserToken } from '@/lib/userServices';
import { useDispatch, useSelector } from 'react-redux';
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Loader from '@/Utils/Loader';

export type InitializerContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};
export const InitializerContext = createContext<InitializerContextType | null>(null);

export default function AppInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const [darkMode, setDarkMode] = useState(false);
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);
    const { user } = useSelector((state: any) => state.userServices);

    // Dark Mode
    useEffect(() => {
        const savedTheme = Cookies.get('theme');
        const isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
        Cookies.set('theme', isDark ? 'dark' : 'light');
        setIsThemeLoaded(true);
    }, []);

    useEffect(() => {
        if (isThemeLoaded) {
            document.documentElement.classList.toggle('dark', darkMode);
            Cookies.set('theme', darkMode ? 'dark' : 'light');
        }
    }, [darkMode, isThemeLoaded]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token && !user) {
            dispatch(verifyUserToken(token));
        }
    }, []);
    if (!isThemeLoaded) {
        return <Loader />;
    }
    //#endregion

    return (
        <InitializerContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </InitializerContext.Provider>
    );
}
