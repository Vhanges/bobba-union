import Image from 'next/image';
import { forwardRef } from 'react';

type FloatingBobbaProps = {
    className ?: string;
}

const FloatingBobba = forwardRef<HTMLImageElement, FloatingBobbaProps>(
    ({className}, ref) => {
        return(
            <Image
                ref={ref}
                src="/assets/images/floating_bobba.png"
                alt="Bobba Union Logo"
                height={160}
                width={160}
                className={`absolute -z-1 object-fill ${className ?? ""}`}
                priority
            />
        );
    }
);

FloatingBobba.displayName = 'FloatingBobba';

export default FloatingBobba;