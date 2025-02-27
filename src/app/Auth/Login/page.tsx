'use client'
import { Formik, Form } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin, userActions } from '@/lib/userServices'
import { AppDispatch, RootState } from '@/lib/store'
import InputField from '@/Utils/InputField'

export default function Login() {
    const { push } = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { clearState } = userActions;
    const { isLoading, success, message } = useSelector((state: RootState) => state.userServices.requestState['doLogin']);

    useEffect(() => {
        //clear last request data...
        return () => { dispatch(clearState('doLogin')) };
    }, []);

    const initialValues = {
        email: '',
        password: ''
    };

    const formInputs = [
        {
            id: 'email',
            name: 'Email',
            type: 'email',
        },
        {
            id: 'password',
            name: 'Password',
            type: 'password',
        }
    ];

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (values: any) => {
        const response = await dispatch(doLogin(values));
        if (response.payload.success) {
            push('/');
        }
    }

    return (
        <section className="flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-[var(--bg-secondary)] p-8 shadow-lg shadow-gray-600/50">
                <div>
                    <h1 className="text-3xl font-bold text-center text-[var(--text-primary)]">Welcome Back</h1>
                    <p className="mt-2 text-center text-[var(--text-secondary)]">Sign in to your account</p>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-6">
                            <div className="space-y-4">
                                {formInputs.map((input) => (
                                    <InputField
                                        key={input.id}
                                        id={input.id}
                                        name={input.name}
                                        type={input.type}
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex justify-center items-center gap-5 w-full rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--accent-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 disabled:bg-[var(--accent-secondary)] disabled:cursor-not-allowed">
                                {isLoading ? 'Signing in...' : 'Sign In'}

                                {isLoading && <div className="flex justify-center items-center">
                                    <div className="w-6 h-6 border-t-2 border-b-2 border-[var(--text-primary)] rounded-full animate-spin"></div>
                                </div>}
                            </button>

                            {message && <div className={`text-center text-md ${success ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}

                            <div className="text-center text-sm text-[var(--text-secondary)]">
                                Don't have an account?{' '}
                                <Link href="/Auth/Register" className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]">
                                    Register here
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
