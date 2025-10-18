"use client";
import Link from "next/link";

type CTAButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function CTAButton({
    href,
    children,
    className
}: CTAButtonProps){
    return (
        <Link
            href={href}
            className={`text-white text-center bg-primary font-semibold rounded-2xl py-3 px-2 ${className ?? ""}`}
        >
            {children}
        </Link>
    )
}