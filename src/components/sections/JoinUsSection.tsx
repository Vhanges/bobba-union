import Image from 'next/image'
import CTAButton from '../CTAButton';
import FloatingBobba from '../FloatingBobba';

type JoinUsSectionProps = {
    className?: string;
}
export default function JoinUsSection({ className }: JoinUsSectionProps){
    return(
        <section className={`w-full flex flex-col-reverse lg:flex-row justify-center items-center gap-10 p-[50px] pb-[150px] ${className ?? ''}`}>
            <div className="join-us-section-header relative w-auto flex flex-col">
                <h1 className="text-4xl md:text-5xl text-primary font-extrabold leading-tight">
                Join the Bobba <br /> Union Family &mdash; <br /> Start Your Franchise <br /> Today!
                </h1>
                <CTAButton
                    href="/"
                    className="text-lg md:text-2xl text-center w-auto py-[20px] mt-10"
                >
                    Let’s Brew Success Together!
                </CTAButton>
                <FloatingBobba className="join-us-bobba z-5 absolute -bottom-3 -right-25 h-25 w-25"/>
            </div>
            <Image
                src="/assets/images/bobba-union_building.webp"
                alt="Hero Product"
                width={550}
                height={500}
                quality={85}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 500px"
                className="join-us-section-img w-full max-w-[500px] h-auto"
            />
        </section>
    );
}