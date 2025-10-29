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
            <section className="h-[600px] w-full hidden relative md:flex items-center justify-around pt-20 px-5 lg:px-[50px] xl:px-[100px] overflow-hidden">
                {
                    // Hero Text and CTA Button
                }
                <div className="flex-1 flex flex-col">
                    <h1 className="text-5xl text-primary font-extrabold">     
                    </h1>
                    <h2 className="text-5xl text-primary font-pacifico">
                        Creamy Goodness
                    </h2>
                    <p className="text-3xl mt-7 font-bold">
                        Refreshing, creamy, and <br/> irresistibly smooth.
                    </p>
                    
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
                    width={380}
                    height={700}
                    priority 
                    sizes="(max-width: 768px) 300px, 380px"
                    className="absolute right-0 bottom-3 -rotate-15"
                    style={{ animation: 'slideUp 0.8s ease-out forwards' }}
                    />
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
                    src="/assets/images/hero-image.png"
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