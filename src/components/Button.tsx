"use client";

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "ghost";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({
    children,
    className,
    variant = "primary",
    onClick,
    type = "button"
}: ButtonProps){
    const variantClasses = {
        primary: "text-white bg-primary hover:bg-primary/80",
        secondary: "text-text bg-white hover:bg-stone-300",
        ghost: "text-text"
    }

    return (
        <button
            type={type}
            className={`w-auto h-auto py-3 px-2 rounded-2xl font-semibold ${variantClasses[variant]} ${className ?? ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}