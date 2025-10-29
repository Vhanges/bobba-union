"use client";
import OfferingCard from "../OfferingCard";

export default function ExploreSection(){
    return (
        <>
            <section className="h-auto relative flex flex-col justify-start items-center py-5 px-[20px] md:px-[100px] lg:px-[50px] md:pt-20 pb-[150px] gap-[50px] md:gap-[150px] overflow-hidden">
                <span className="block">
                    <h1 className="text-5xl text-primary text-center font-extrabold">    
                        Explore What&apos;s inside
                    </h1>
                </span> 

                <div className="flex flex-col justify-around gap-[40px] md:gap-[150px] ">
                    <OfferingCard
                        imgSrc="/assets/images/offer-image.png"
                        title="Reliable Equipment for Better Results"
                        description="
                            We use high-quality tools to make work easier,
                            faster, and more efficient—helping you achieve 
                            the best possible outcome with every task."
                        isReversed={false}
                    />
                    <OfferingCard
                        imgSrc="/assets/images/offer-image-1.png"
                        title="Fresh, Premium Ingredients for Perfect Flavor"
                        description="
                            We source only the finest ingredients to ensure
                            rich taste, superior quality, and consistency in every creation.
                            Carefully selected for freshness and excellence, our ingredients 
                            bring out the best in cup."
                        isReversed={true}
                    />
                    <OfferingCard
                        imgSrc="/assets/images/offer-image-2.png"
                        title="Meet the Team Behind the Excellence"
                        description="
                            Our skilled and passionate team is the heart of everything we do.
                            With expertise, dedication, and a commitment to quality, they ensure
                            every experience is seamless and exceptional. Trust in the people 
                            who make it all possible."
                        isReversed={false}
                    />
                </div>
            </section>
        </>
    );
}