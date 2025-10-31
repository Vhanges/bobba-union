import TestimonialCard from "../TestimonialCard";

export default function TestimonialsSection(){
    return(
        <section className="h-auto relative flex flex-col justify-start items-center py-5 px-5 md:pt-20 pb-[150px] gap-[140px] overflow-hidden">
            <span className="block">
                <h1 className="text-5xl text-primary text-center font-extrabold">    
                    Customer Feedback
                </h1>
            </span> 

            <div className="h-auto w-full flex flex-row justify-center gap-10 md:gap-[25px] lg:gap-[50px] overflow-x-auto scrollbar-hide">
                <TestimonialCard imgSrc="/assets/images/customer-picture.png">
                    <p className="w-full text-xl text-white line-clamp-3">
                        We never knew coffee could taste this smooth until we tried <strong>Bobba Union</strong> Every
                        cup feels like a tiny morning ritual — rich, bold, and beautifully balanced.
                        We&apos;ve stopped going to cafes because now my favorite brew is just a kitchen away
                    </p>
                </TestimonialCard>
                <TestimonialCard imgSrc="/assets/images/customer-picture.png">
                    <p className="w-full text-xl text-white line-clamp-3">
                        Not gonna lie, I wasn’t even a &apos;coffee person&apos;...
                        but now I’m brewing a fresh pot every morning. 
                        Smooth, strong, no bitterness — this changed my whole routine.
                    </p>
                </TestimonialCard>
                <TestimonialCard imgSrc="/assets/images/customer-picture.png">
                    <p className="w-full text-xl text-white line-clamp-3">
                        Each cup from <strong>Bobba Union</strong> feels like a cozy morning hug.
                        The aroma alone makes me slow down and savor the moment &mdash; it&rsquo;s
                        not just coffee, it&rsquo;s my daily pause.

                    </p>
                </TestimonialCard>
            </div>
        </section>
    );
}