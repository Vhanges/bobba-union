"use client";

type TextInputFieldProps = {
    id: string;
    name: string;
    type: string;
    value: string;
    label?: string;
    hideLabel?: boolean;
    labelClass?: string;
    inputClass?: string;
    placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>

export default function TextInputField({
    id,
    name,
    type,
    value,
    label,
    hideLabel,
    labelClass,
    inputClass,
    placeholder,
    ...props
}: TextInputFieldProps){
    return (
        <div className="mb-4 flex flex-col gap-1">
            {!hideLabel && (
                    <label htmlFor={id} className={`text-base ${labelClass}`} >
                        {label}
                    </label>
            )}
            <input 
                id={id}
                type={type}
                name={name}
                value={value}
                className={`border rounded-[10px] px-3 py-2 ${inputClass ?? ""}`}
                placeholder={placeholder}
                {...props}
            />

        </div>
    );
}