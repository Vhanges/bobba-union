"use client";
import ProductCard from "../products/ProductCard";

export default function LatestCreationsSection(){
    return (
        <>
            <section className="h-auto relative flex flex-col justify-start items-center py-5 px-5 md:pt-20 pb-[150px] gap-[140px] overflow-hidden">
                <span className="block">
                    <h1 className="text-5xl text-primary text-center font-extrabold">    
                        Our Latest Creations
                    </h1>
                    <h3 className="text-xl text-center font-bold mt-7">
                        New blends, new experiences—crafted to delight every sip.
                    </h3>
                </span> 

                <div className="flex flex-col justify-around md:flex-row gap-[150px] md:gap-[25px] lg:gap-[50px]">
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </section>
        </>
    );
}