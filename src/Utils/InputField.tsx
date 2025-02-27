import { ErrorMessage, Field } from "formik";

interface Option {
    value: string;
    label: string;
    displayValue?: string;
}

interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    options?: Option[];
}

export default function InputField({ id, name, type, options }: InputFieldProps) {
    if (type === 'select') {
        return (
            <div className="relative z-0 w-full group">
                <Field
                    as="select"
                    id={id}
                    name={id}
                    className="block py-2.5 px-0 w-full text-sm text-[var(--text-primary)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-primary)] peer ps-2"
                >
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}
                            className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                            {option.label}
                        </option>
                    ))}
                </Field>
                <ErrorMessage name={id} component="div" className="mt-1 text-sm text-red-500" />
                <label
                    htmlFor={id}
                    className="absolute text-md text-[var(--text-secondary)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[var(--accent-primary)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    {name}
                </label>
            </div>
        );
    }

    return (
        <div className="relative z-0 w-full group">
            {type === 'textarea' ?
                <Field
                    as="textarea"
                    id={id}
                    name={id}
                    className="max-h-[150px] block py-2.5 px-0 w-full text-sm text-[var(--text-primary)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-primary)] peer valid:border-[var(--accent-primary)]"
                    placeholder=" "
                    required
                    rows={4}
                    maxLength={1200}
                /> : <Field
                    id={id}
                    type={type}
                    name={id}
                    className="block py-2.5 px-0 w-full text-sm text-[var(--text-primary)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-primary)] peer valid:border-[var(--accent-primary)]"
                    placeholder=" "
                    required
                />
            }
            <ErrorMessage name={id} component="div" className="mt-1 text-sm text-red-500" />
            {options && (
                <Field as="select" id={id} name={id} className="block py-2.5 px-0 w-full text-sm text-[var(--text-primary)] bg-transparent border-0 border-b-2 border-[var(--border)] appearance-none focus:outline-none focus:ring-0 focus:border-[var(--accent-primary)] peer valid:border-[var(--accent-primary)]">
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </Field>
            )}
            <label
                htmlFor={id}
                className="absolute text-sm text-[var(--text-secondary)] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[var(--accent-primary)] peer-focus:font-medium peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-valid:text-[var(--accent-primary)]">
                {name}
            </label>
        </div>
    )
}
