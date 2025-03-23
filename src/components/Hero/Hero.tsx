import Image from "next/image"
import AnimatedText from "../AnimatedText/AnimatedText"
import Navigation from "../Navigation/Navigation"
import Sky1 from "../../../public/images/svg/sky1.svg"
import Sky2 from "../../../public/images/svg/sky2.svg"
import Parts from "../../../public/images/svg/parts.svg"



const Hero = () => {
    return (
        <section className="w-full flex flex-col items-center bg-primary-light-green  pt-4 pb-8 lg:pb-16 relative">
            <Navigation />
            <div className="flex flex-col items-center gap-4 mt-8 lg:mt-16">
                <h1 className="text-4xl lg:text-6xl font-semibold text-black leading-relaxed text-center">
                    <p>Find your perfect</p>
                    <div className="flex gap-2"><AnimatedText className="text-primary-green text-5xl lg:text-7xl text-caveat min-w-[6ch] text-center" texts={["home", "land", "office"]} /> <span>in minutes</span></div>
                </h1>
                <p className="text-lg text-gray-600 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, consequuntur.</p>
                <p className="text-lg text-gray-600 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="absolute bottom-0 right-0 w-[20%] flex justify-end z-0 items-end">
                <Image src={Sky2} alt="sky" className="object-contain" />
                <Image src={Sky1} alt="sky" className="object-contain" />
            </div>
            <div className="absolute bottom-0 left-0 w-[30%] flex justify-start z-0 items-end">
                <Image src={Parts} alt="sky" className="object-contain" />

            </div>
        </section>
    )
}

export default Hero