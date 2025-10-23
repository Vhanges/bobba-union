"use client";
import { useState } from "react";
import CTAButton from "../CTAButton";
import Link from "next/link";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";

export default function PublicNavbar(){
    const [ isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="w-full flex place-content-between items-end bg-color-primary py-3 px-5 lg:px-[50px] xl:px-[100px]">

                {
                    /**
                     * Logo and Title
                     */
                }
                <span className="flex gap-1 items-end">  
                    <div className="relative w-[42px] h-[42px] md:w-[84px] md:h-[84px]">
                        <Image
                            src="/assets/images/logo.png"
                            alt="Bobba Union Logo"
                            fill
                            style={{
                                objectFit: "cover"
                            }}
                        />
                    </div>
                    <h3 className="text-primary text-xl md:text-3xl md:pb-2.5 font-bold">
                        Bobba Union 
                    </h3>
                </span>

                <nav className="hidden lg:flex gap-8 p-4">
                    <Link href="/" className="text-xl md:text-base font-semibold">About Us</Link>
                    <Link href="/" className="text-xl md:text-base font-semibold">Flavours</Link>
                    <Link href="/" className="text-xl md:text-base font-semibold">Contact Us</Link>
                    <Link href="/" className="text-xl md:text-base font-semibold">Our Location</Link>
                </nav>

                <CTAButton href="/" className="hidden lg:block text-xl p-4">
                    Order Now
                </CTAButton>
            

                {
                    /**
                     * Mobile Menu
                     */
                }
                <span className="inline lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <List
                    className={`${isOpen ? "hidden" : "block"} w-6 h-6 md:w-12 md:h-12 md:pb-2.5`}
                    />
                </span>
            </nav>

            {
                /**
                 * Off-canvas nav
                 */
            }
            <div className={`z-10 fixed top-0 right-0 h-full w-full flex flex-col gap-5 py-5 px-3 bg-background transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

                {
                    /**
                     *  Brand and Menu
                     */
                }
                <div className="flex place-content-between items-center">
                    <span className="flex gap-1 items-end">  
                        <div className="relative w-[42px] h-[42px] md:w-[84px] md:h-[84px]">
                            <Image
                                src="/assets/images/logo.png"
                                alt="Bobba Union Logo"
                                fill
                                style={{
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <h1 className="text-primary text-xl font-semibold md:text-3xl md:pb-2.5">
                            Bobba Union 
                        </h1>
                    </span>
                    <X
                        size={32}
                        className={`${isOpen ? "visible": "hidden"  }`}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>

                {
                    /**
                     *  Nav Links
                     */
                }
                <nav className="flex flex-col gap-8 p-4">
                    <Link href="/" className="text-3xl font-semibold">About Us</Link>
                    <Link href="/" className="text-3xl font-semibold">Flavours</Link>
                    <Link href="/" className="text-3xl font-semibold">Contact Us</Link>
                    <Link href="/" className="text-3xl font-semibold">Our Location</Link>
                </nav>

                {
                    /**
                     * Nav Hero Branding
                     */
                }
                <div className="h-full relative flex flex-col py-3 px-5 pb-[150px] gap-2 mt-10">
                    <h1 className="text-5xl text-primary font-extrabold">    
                        Your Daily <br/> Dose of
                    </h1>
                    <h3 className="text-2xl text-primary font-pacifico">
                        Creamy Goodness
                    </h3>

                    <h3 className="text-xl mt-7 font-bold">
                        Refreshing, creamy, and irresistibly smooth.
                    </h3>

                    <Image
                        src="/assets/images/hero-image.png"
                        alt="Hero Product"
                        width={200}
                        height={330}
                        className="absolute bottom-5 -right-30 rotate-[-10deg]"
                    />
                </div>
            </div>
        </>
    
    );
}