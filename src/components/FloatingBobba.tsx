import Image from 'next/image';

type FloatingBobbaProps = {
    className ?: string;
}

export default function FloatingBobba({
    className
}: FloatingBobbaProps) {
    return(
        <Image
            src="/assets/images/floating_bobba.png"
            alt="Bobba Union Logo"
            height={160}
            width={160}
            className={`absolute -z-1 object-fill ${className ?? ""}`}
            priority
        />
    );
}