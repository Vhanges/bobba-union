"use client";
import { FacebookLogoIcon, InstagramLogoIcon, TiktokLogoIcon, XLogoIcon,  } from "@phosphor-icons/react";

type SocialsSectionProps = {
    className?: string;
}

export default function SocialsSection({ className }: SocialsSectionProps){
    return (
            <section className={`h-auto relative flex flex-col justify-start items-center py-5 px-5 md:pt-20 pb-[150px] gap-[140px] overflow-hidden ${className ?? ''}`}>
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-5xl text-primary text-justify font-extrabold">    
                        We’d love to hear from you
                    </h1>

                    <h2 className="w-full md:w-[70%] text-2xl text-left md:text-center font-bold mt-7">
                        Connect with us on Facebook, Instagram, TikTok,
                        and X for updates, support, and behind-the-scenes content
                    </h2>
                </div> 

                <div className="flex flex-row justify-around gap-[25px] md:gap-[50px] lg:gap-[100px]">
                    <span className="flex flex-col items-center">
                        <FacebookLogoIcon 
                            className="w-10 h-10 lg:w-30 lg:h-30" 
                            weight="bold"
                        />
                        <p className="text-base md:text-2xl text-center font-bold mt-5">
                            Facebook
                        </p>
                    </span>
                    <span className="flex flex-col items-center">
                        <InstagramLogoIcon 
                            className="w-10 h-10 lg:w-30 lg:h-30" 
                            weight="bold"
                        />
                        <p className="text-base md:text-2xl text-center font-bold mt-5">
                            Instagram
                        </p>
                    </span>
                    <span className="flex flex-col items-center">
                        <XLogoIcon 
                            className="w-10 h-10 lg:w-30 lg:h-30" 
                            weight="bold"
                        />
                        <p className="text-base md:text-2xl text-center font-bold mt-5">
                            x(Twitter)
                        </p>
                    </span>
                    <span className="flex flex-col items-center">
                        <TiktokLogoIcon 
                            className="w-10 h-10 lg:w-30 lg:h-30" 
                            weight="bold"
                        />
                        <p className="text-base md:text-2xl text-center font-bold mt-5">
                            Tiktok
                        </p>
                    </span>

                </div>
            </section>
    );
}