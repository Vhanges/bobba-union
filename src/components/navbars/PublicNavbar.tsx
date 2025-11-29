import CTAButton from "../CTAButton";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

export default function PublicNavbar(){
    return (
        <nav className="w-full sticky top-0 z-50 flex place-content-between items-end bg-background py-3 px-5 lg:px-[50px] xl:px-[100px]">
            {
                /**
                 * Logo and Title
                 */
            }
            <span className="flex gap-1 items-end">  
                <div className="relative w-[42px] h-[42px] md:w-[84px] md:h-[84px]">
                    <Image
                        src="/assets/images/logo.webp"
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
                 * Mobile Menu (Client Island)
                 */
            }
            <MobileMenu />
        </nav>
    );
}