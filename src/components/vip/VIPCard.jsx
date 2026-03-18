
import { Card, CardContent, } from "@/components/ui/card";
import VipFeaturesSection from "./VipFeaturesSection";
import icon1 from "@/assets/icons/icon-1.png"
import { vipImages } from "@/data/vipImages";


const VIPCard = ({ vip }) => {
    const currentImages = vipImages[vip.id] || {}
    return (
        <Card>
            <div className="relative py-20 min-h-[300px] md:min-h-[400px] text-center text-amber-50">
                <div className="absolute left-10 top-5 
                    w-20 h-20 
                    sm:w-25 sm:h-25 
                    md:w-30 md:h-30">
                    <img
                        src={currentImages.main}
                        alt="left"
                        className="object-contain w-full"
                        loading="lazy"
                    />
                    <h2 className="text-lg font-semibold ">{vip.name}</h2>
                    <p className="mt-2">Duration: {vip.duration} days</p>
                    <p className="mt-2">coins: {vip.duration} </p>
                </div>
                <img
                    src={currentImages.badge}
                    alt={vip?.name}
                    loading="lazy"
                    className="
                        absolute 
                        right-5
                        top-20 
                        md:top-40
                        w-40 h-40          
                        sm:w-50 sm:h-50    
                        md:w-60 md:h-60    
                        object-contain
                    "
                />
            </div>

            <CardContent className="mt-10 mb-30 lg:mt-40 md:mt-0 py-6 relative z-10 ">
                <h3 className="font-semibold mb-8 text-lg text-primary flex justify-center items-center gap-5">
                    <img src={icon1} alt="icon" className="h-10 w-10" />
                    Exclusive Privilege
                    <img src={icon1} alt="icon" className="h-10 w-10 scale-x-[-1]" />
                </h3>

                <VipFeaturesSection />
            </CardContent>
        </Card>
    );
};

export default VIPCard;