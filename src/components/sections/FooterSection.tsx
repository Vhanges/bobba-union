"use client"

import Link from "next/link";
import { useState } from "react";
import TextInputField from "../TextInputField";
import Button from "../Button";
import { CoffeeBeanIcon } from "@phosphor-icons/react";



export default function FooterSection(){
    const [newsletter, setNewsletter] = useState("");

    return (
        <section className="h-auto w-full relative flex flex-col justify-center items-center bg-primary px-5 py-[50px] md:px-[50px] gap-10">
            {
                /**
                 * Footer HEading
                 */
            }
            <div className="w-full 2xl:w-[1200px] block mb-5">
                <h1 className="text-4xl md:text-5xl text-white font-bold">Bobba Union</h1>
                <span className="w-full h-[25x] flex gap-2.5 mt-2.5">
                    <div className="w-90 md:w-2xl h-[25px] bg-background rounded-full"></div>
                <div className="w-6 h-[25px] bg-background rounded-full"></div>
            </span>
            </div>
            
            {
                /**
                 * Newsletter and Links
                 */
            }
            <div className="w-full 2xl:w-[1200px] h-auto flex flex-col md:flex-row gap-10 md:gap-[50px] lg:gap-[150px]">
                <div className="h-auto w-full md:w-[500px] block">
                    <p className="text-base text-white font-bold">
                        We’d love to share fresh updates with you—like a warm cup of coffee for your inbox.
                        Leave your email below, and we’ll send you simple, helpful notes you can enjoy anytime.
                    </p>
                    <form action="" method="post">
                        <TextInputField
                            id="newsletter"
                            name="newsletter"
                            type="text"
                            value={newsletter}
                            hideLabel={true}
                            placeholder="youremail@gmail.com"
                            inputClass="w-full md:w-[400px] mt-5
                                        text-base
                                        bg-white border-0 
                                        focus:outline-none 
                                        focus:ring-2 focus:ring-white 
                                        focus:ring-offset-2 focus:ring-offset-primary"
                            onChange={(e) => setNewsletter(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-full md:w-[400px] rounded-[10px]"
                        >
                            Keep me updated
                        </Button>
                    </form>
                </div>
                <div className="h-auto flex flex-col md:flex-row gap-10">
                    <div className="h-auto flex flex-col gap-4">
                        <Link href="/" className="text-3xl text-white font-bold">About Us</Link>
                        <Link href="/" className="text-3xl text-white font-bold">Flavours</Link>
                        <Link href="/" className="text-3xl text-white font-bold">Contact Us</Link>
                        <Link href="/" className="text-3xl text-white font-bold">Our Location</Link>
                    </div>
                    <div className="h-auto flex flex-col gap-4">
                        <Link href="/" className="text-3xl text-white font-bold">Privacy Policy</Link>
                        <Link href="/" className="text-3xl text-white font-bold">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <p className="w-full text-white text-center text-base font-bold mt-10">© 2025 Angelo Sevhen. All rights reserved.</p>
            <CoffeeBeanIcon
                size={120}
                weight="fill"
                className="-z-0 hidden md:block absolute text-background -top-10 right-100"
            />
            <CoffeeBeanIcon
                size={120}  
                weight="fill"
                className="hidden md:block absolute text-white top-0 right-0"
            />
            <CoffeeBeanIcon
                size={120}
                weight="fill"
                className="hidden md:block absolute text-white bottom-0 right-0"
            />
        </section>
    );
}