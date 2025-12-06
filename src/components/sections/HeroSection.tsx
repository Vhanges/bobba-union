import Image from "next/image";
import CTAButton from "../CTAButton";
import FloatingBobba from "../FloatingBobba";

type HeroSectionProps = {
    className ?: string;
}

export default function HeroSection(
    {className}: HeroSectionProps
){
    return (
        <>

            {
                /**
                 * Medium to Large Media 
                 */
            }
            <section className={`"w-full hidden relative md:grid place-items-center justify px-5 lg:px-[50px] xl:px-[100px] overflow-hidden" ${className ?? ''}`}>
                
                <FloatingBobba
                    className="rotating-bounce top-14 right-[500px]"
                />

                <FloatingBobba
                    className="rotating-bounce bottom-20 right-[400px]"
                />

                <FloatingBobba
                    className="rotating-bounce top-40 right-[100px]"
                />

                <div className="grid grid-cols-[625px_550px] gap-10">
                    
                    {/* Hero Text and CTA */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-6xl text-primary font-extrabold">     
                            Your Daily Dose of
                        </h1>
                        <h2 className="text-6xl text-primary font-pacifico mt-3">
                            Creamy Goodness
                        </h2>
                        <p className="text-3xl mt-7 font-bold">
                            Refreshing, creamy, and <br/> irresistibly smooth.
                        </p>
                        <CTAButton href="/" className="text-2xl text-center py-[20px] px-[50px] mt-10">
                            Explore More
                        </CTAButton>
                    </div>

                    {/* Hero Image */}
                    <div className="relative h-[600px] w-[550px]">
                        <Image
                            src="/assets/images/hero-image.webp"
                            alt="Hero Product"
                            width={350}
                            height={350}
                            priority
                            quality={85}
                            className="absolute -right-2 bottom-15 -rotate-15 object-contain slide-up"
                        />
                    </div>

                </div>
            </section>



            {
                /**
                 * Small Media 
                 */
            }
            <section className="h-[700px] relative flex flex-col md:hidden justify-center items-start py-3 px-5 pb-[100px] gap-2 overflow-hidden">
                <h1 className="text-5xl text-primary font-extrabold">    
                    Your Daily <br/> Dose of
                </h1>
                <h2 className="text-2xl text-primary font-pacifico">
                    Creamy Goodness
                </h2>

                <p className="text-xl mt-7 font-bold">
                    Refreshing, creamy, and <br/> irresistibly smooth.
                </p>

                <CTAButton href="/" className="w-70 px-5 mt-10">
                    Explore More
                </CTAButton>

                <Image
                    src="/assets/images/hero-image.webp"
                    alt="Hero Product"
                    width={300}
                    height={490}
                    priority 
                    className="absolute -right-47"
                />
            </section>           
        </>
    );
}