import TestimonialCard from "../TestimonialCard";

type TestimonialsSectionProps = {
    className?: string;
}

const testimonials = [
    {
        id: 1,
        body: (
            <p className="w-full text-xl text-white line-clamp-3">
                We never knew coffee could taste this smooth until we tried <strong>Bobba Union</strong> Every
                cup feels like a tiny morning ritual — rich, bold, and beautifully balanced.
                We&apos;ve stopped going to cafes because now my favorite brew is just a kitchen away
            </p>
        ),
    },
    {
        id: 2,
        body: (
            <p className="w-full text-xl text-white line-clamp-3">
                Not gonna lie, I wasn’t even a &apos;coffee person&apos;...
                but now I’m brewing a fresh pot every morning.
                Smooth, strong, no bitterness — this changed my whole routine.
            </p>
        ),
    },
    {
        id: 3,
        body: (
            <p className="w-full text-xl text-white line-clamp-3">
                Each cup from <strong>Bobba Union</strong> feels like a cozy morning hug.
                The aroma alone makes me slow down and savor the moment &mdash; it&rsquo;s
                not just coffee, it&rsquo;s my daily pause.
            </p>
        ),
    },
];

const marqueeGroups = Array.from({ length: 4 });

export default function TestimonialsSection({ className }: TestimonialsSectionProps){
    return(
        <section className={`h-auto relative flex flex-col justify-start items-center py-5 px-5 md:pt-20 pb-[150px] gap-[140px] overflow-hidden ${className ?? ''}`}>
            <span className="block">
                <h1 className="text-5xl text-primary text-center font-extrabold">    
                    Customer Feedback
                </h1>
            </span> 

            <div className="pause-on-hover w-full mx-auto overflow-hidden">
                <div className="flex min-w-full xl:min-w-[72rem] gap-10 md:gap-[25px] lg:gap-[50px] px-2 [--duration:36s]">
                    {marqueeGroups.map((_, groupIndex) => (
                        <div
                            key={groupIndex}
                            className="flex shrink-0 justify-around gap-10 md:gap-[25px] lg:gap-[50px] animate-marquee"
                        >
                            {testimonials.map((testimonial) => (
                                <TestimonialCard key={`${groupIndex}-${testimonial.id}`} imgSrc="/assets/images/customer-picture.webp">
                                    {testimonial.body}
                                </TestimonialCard>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}