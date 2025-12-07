import FloatingBobba from "../FloatingBobba";
import ProductCard from "../products/ProductCard";
type HeroSectionProps = {
    className ?: string;
}

export default function LatestCreationsSection(
    {className}: HeroSectionProps
){
    return (
            <section className={`h-auto relative flex flex-col justify-start items-center py-5 px-5 md:pt-20 pb-[150px] gap-[140px] overflow-hidden ${className ?? ''}`}>
                
                <FloatingBobba className="latest-creation-bobba absolute top-0 h-20 w-20"/>
                <span className="block">
                    <h1 className="text-5xl text-primary text-center font-extrabold">    
                        Our Latest Creations
                    </h1>
                    <h2 className="text-3xl text-center font-bold mt-7">
                        New blends, new experiences—crafted to delight every sip.
                    </h2>
                </span> 

                <div className="flex flex-col justify-around md:flex-row gap-[150px] md:gap-[25px] lg:gap-[50px]">
                    <ProductCard imageClassName="product-img-1"/>
                    <ProductCard imageClassName="product-img-2"/>
                    <ProductCard imageClassName="product-img-3"/>
                </div>
            </section>
    );
}