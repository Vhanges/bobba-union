import Image from "next/image";

type OfferingCardProps = {
    imgSrc: string,
    title: string,
    description: string,
    isReversed: boolean
}

export default function OfferingCard( {imgSrc, title, description, isReversed}: OfferingCardProps){
    return(
        <>
            {
                /**
                 *  Large Media
                 */
            }
            <div className={`lg:w-[900px] xl:w-[1100px] hidden lg:flex items-center justify-center gap-20 ${isReversed ? "flex-row-reverse" : "flex-row" }`}>
                <div className="relative w-[500px] h-[450px] shrink-0 rounded-2xl border-5 border-primary overflow-hidden">
                    <Image
                        src={imgSrc}
                        alt="Bobba Union Logo"
                        fill
                        className="-z-1 object-fill"
                        priority
                    />
                </div>

                <div className="h-auto flex flex-col gap-10">
                    <div className="h-auto w-full bg-primary flex items-center justify-center py-5 px-5">
                        <h1 className="text-4xl text-white font-semibold">
                            {title}
                        </h1>
                    </div>
                    <div className="h-full w-full flex items-start justify-center">
                        <p className="text-xl font-semibold">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {
                /**
                 *  Small to Medium Media
                 */
            }
            <div className="w-full h-auto flex flex-col items-center gap-10 lg:hidden">
                <div className="h-auto flex flex-col gap-10">
                    <div className="h-auto w-full bg-primary flex items-center justify-center py-5 px-5">
                        <h1 className="text-3xl text-white font-semibold">
                            {title}
                        </h1>
                    </div>
                    <div className="h-full w-full flex items-start justify-center">
                        <p className="text-xl font-semibold">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="relative w-full h-[300px] shrink-0 rounded-2xl border-5 border-primary overflow-hidden">
                    <Image
                        src={imgSrc}
                        alt="Bobba Union Logo"
                        fill
                        className="-z-1 object-fill"
                        priority
                    />
                </div>
            </div>
        </>
    );
}