'use client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { register, userActions } from '@/lib/userServices'
import { AppDispatch, RootState } from '@/lib/store'
import InputField from '@/Utils/InputField'

export default function Register() {

    const { push } = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, success, message } = useSelector((state: RootState) => state.userServices.requestState['register']);

    useEffect(() => {
        //clear last request data...
        return () => { dispatch(userActions.clearState('register')) };
    }, []);

    const initialValues = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const formInputs = [
        {
            id: 'username',
            name: 'Username',
            type: 'text',
        },
        {
            id: 'firstName',
            name: 'First Name',
            type: 'text',
            children:
            {
                id: 'lastName',
                name: 'Last Name'
            },
        },
        {
            id: 'email',
            name: 'Email',
            type: 'email',
        },
        {
            id: 'password',
            name: 'Password',
            type: 'password',
        },
        {
            id: 'confirmPassword',
            name: 'Confirm Password',
            type: 'password',
        },
    ]

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(4, 'Username must be at least 4 characters')
            .required('Username is required'),
        firstName: Yup.string()
            .min(4, 'First Name must be at least 4 characters')
            .required('First Name is required'),
        lastName: Yup.string()
            .min(4, 'Last Name must be at least 4 characters')
            .required('Last Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be characters contain uppercase, lowercase, number, special character')
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password')
    });

    const handleSubmit = async (values: any) => {
        const response: any = await dispatch(register(values));
        if (!response.payload.success) {
            dispatch(userActions.destroyUser());
        }
    }

    return (
        <section className="flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-[var(--bg-secondary)] p-8 shadow-lg shadow-gray-600/50">
                <div>
                    <h1 className="text-3xl font-bold text-center text-[var(--text-primary)]">Register</h1>
                    <p className="mt-2 text-center text-[var(--text-secondary)]">Create your account</p>
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
                                    <div key={input.id}>
                                        {input.children ? (
                                            <div className="flex gap-2">
                                                <InputField id={input.id} name={input.name} type={input.type} />
                                                <InputField id={input.children.id} name={input.children.name} type={input.type} />
                                            </div>
                                        ) : <InputField id={input.id} name={input.name} type={input.type} />}

                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex justify-center items-center gap-5 w-full rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-[var(--text-primary)] transition-colors hover:bg-[var(--accent-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 disabled:bg-[var(--accent-secondary)] disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Creating Account...' : 'Register'}

                                {isLoading && <div className="flex justify-center items-center">
                                    <div className="w-6 h-6 border-t-2 border-b-2 border-[var(--text-primary)] rounded-full animate-spin"></div>
                                </div>}
                            </button>

                            {message && <div className={`text-center text-md ${success ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}

                            <div className="text-center text-sm text-[var(--text-secondary)]">
                                Already have an account?{' '}
                                <Link href="/Auth/Login" className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]">
                                    Login here
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
