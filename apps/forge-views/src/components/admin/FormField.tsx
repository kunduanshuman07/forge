interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

export function FormField({
    label,
    error,
    required,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
                {label}

                {required && (
                    <span className="ml-1 text-orange-500">
                        *
                    </span>
                )}
            </label>

            {children}

            {error && (
                <p className="text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}