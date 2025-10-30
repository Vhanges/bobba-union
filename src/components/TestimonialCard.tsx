
import Image from "next/image"

type TestimonialCardProps = {
    imgSrc: string,
    children: React.ReactNode
}

export default function TestimonialCard({imgSrc, children}: TestimonialCardProps){
    return(
        <div className="w-[300px] min-w-[300px] md:w-[400px] flex flex-col gap-5">
            <div className="relative w-full h-[250px] shrink-0 rounded-2xl border-5 border-primary overflow-hidden">
                <Image
                    src={imgSrc}
                    alt="Bobba Union Logo"
                    fill
                    className="-z-1 object-fill"
                    priority
                />
            </div>
            <span className="flex flex-col justify-start items-center bg-primary rounded-2xl gap-4 py-5 px-2.5">
                
                {children}
                
                <span className="w-full h-[5px] flex gap-2.5">
                    <div className="w-50 h-[5px] bg-background rounded-full"></div>
                    <div className="w-5 h-[5px] bg-background rounded-full"></div>
                </span>
            </span>
            
        </div>
    );
}