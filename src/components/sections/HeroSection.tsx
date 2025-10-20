"use client";

import Image from "next/image";
import CTAButton from "../CTAButton";

export default function HeroSection(){
    return (
        <>

            {
                /**
                 * Medium to Large Media 
                 */
            }
            <div className="h-[600px] w-full hidden relative md:flex items-center justify-between px-[50px]">
                {
                    // Hero Text and CTA Button
                }
                <div className="flex-1 flex flex-col">
                    <h1 className="text-5xl text-primary font-extrabold">    
                        Your Daily Dose of
                    </h1>
                    <h3 className="text-5xl text-primary font-pacifico">
                        Creamy Goodness
                    </h3>
                    <h3 className="text-3xl mt-7 font-bold">
                        Refreshing, creamy, and <br/> irresistibly smooth.
                    </h3>
                    
                    <CTAButton href="/" className="text-2xl text-center w-100 p-y[20px] px-[100px] mt-10">
                        Explore More
                    </CTAButton>
                </div>

                {
                    // Hero Image
                }
                <div className="h-full flex-1 relative">
                    <Image
                        src="/assets/images/hero-image.png"
                        alt="Hero Product"
                        width={350}
                        height={700}
                        className="absolute right-50 md:right-0 bottom-10 -rotate-12"
                        style={{ animation: 'slideUp 0.8s ease-out forwards' }}
                    />
                </div>
            </div>


            {
                /**
                 * Small Media 
                 */
            }
            <div className="h-[700px] relative flex flex-col md:hidden justify-center items-start py-3 px-5 pb-[150px] gap-2 mt-10 overflow-hidden">
                <h1 className="text-5xl text-primary font-extrabold">    
                    Your Daily <br/> Dose of
                </h1>
                <h3 className="text-2xl text-primary font-pacifico">
                    Creamy Goodness
                </h3>

                <h3 className="text-xl mt-7 font-bold">
                    Refreshing, creamy, and <br/> irresistibly smooth.
                </h3>

                <CTAButton href="/" className="w-70 px-5 mt-10">
                    Explore More
                </CTAButton>

                <Image
                    src="/assets/images/hero-image.png"
                    alt="Hero Product"
                    width={300}
                    height={490}
                    className="absolute -right-47"
                />
            </div>           
        </>
    );
}