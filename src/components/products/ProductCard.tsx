"use client";
import Image from "next/image";
import { ShoppingCartSimpleIcon } from "@phosphor-icons/react";

type ProductCardProps = {
    name: string,
    currency: string,
    price: number,
}

export default function ProductCard(){
    return (
        <>
            {
                /**
                 * Large Media 
                 */
            }
            <div className="w-[300px] h-auto relative hidden lg:flex items-center flex-col bg-primary px-6 py-6 gap-5 rounded-bl-2xl rounded-br-2xl rounded-tl-[100px] rounded-tr-[100px]">
                <Image
                    src="/assets/images/product.png"
                    alt="Bobba Union Logo"
                    width={250}
                    height={300}
                    className="absolute -top-25 z-10" 
                    priority
                />
                <span className="w-full h-[250px]"></span>

                <span className="w-full block">
                    <h1 className="text-3xl text-white font-bold max-w-full line-clamp-2">
                        Product Name
                    </h1>
                    <p className="text-xl text-white font-bold mt-3">PHP 39.00</p>
                </span>

                <span className="w-full h-[2px] flex gap-2.5">
                    <div className="w-95 h-[3px] bg-background rounded-full"></div>
                    <div className="w-5 h-[3px] bg-background rounded-full"></div>
                </span>

                <div className="w-full flex justify-center items-center gap-5 py-2.5 px-5">
                    <ShoppingCartSimpleIcon 
                        size={32} 
                        weight="bold"
                        className="text-white"
                    />
                    <p className="text-xl text-white font-bold">Add to cart</p>
                </div>
            </div>

            {
                /**
                 * Small to Medium Media 
                 */
            }
            <div className="w-[300px] md:w-[200px] h-auto relative flex lg:hidden items-center flex-col bg-primary px-6 md:px-3 py-6 gap-5 rounded-bl-2xl rounded-br-2xl rounded-tl-[100px] rounded-tr-[100px]">
                <Image
                    src="/assets/images/product.png"
                    alt="Bobba Union Logo"
                    width={170}
                    height={300}
                    className="absolute -top-25 z-10" 
                    priority
                />
                <span className="w-full h-[150px]"></span>

                <span className="w-full block">
                    <h1 className="text-2xl md:text-xl text-white font-bold max-w-full line-clamp-2">
                        Product Name
                    </h1>
                    <p className="text-lg md:text-base text-white font-bold mt-3">PHP 39.00</p>
                </span>

                <span className="w-full h-[2px] flex gap-2.5">
                    <div className="w-95 h-[3px] bg-background rounded-full"></div>
                    <div className="w-5 h-[3px] bg-background rounded-full"></div>
                </span>

                <div className="w-full flex justify-center items-center gap-5 py-2.5 px-5 md:px-2">
                    <ShoppingCartSimpleIcon 
                        size={32} 
                        weight="bold"
                        className="text-white"
                    />
                    <p className="text-base md:text-sm text-white font-bold">Add to cart</p>
                </div>
            </div>
        </>
    );
}