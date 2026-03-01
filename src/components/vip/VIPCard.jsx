import { Card, CardContent, } from "@/components/ui/card";
import vipFallback from "@/assets/img/vip-fallback.png"
import leftImg from "@/assets/img/tag.png"
import VipFeaturesSection from "./VipFeaturesSection";
import icon1 from "@/assets/icons/icon-1.png"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VIPCard = ({ vip }) => {
    // // صورة الخلفية الأساسية
    // const vipImage = vip.image || vipFallback;

    // // صورة اليسار من المنتج الأول (لو موجود) أو fallback
    // const leftImage =
    //     vip.products[0]?.dynamic_image
    //         ? `${BASE_URL}/public/vip/${vip.products[0].dynamic_image}`
    //         : vipFallback;

    // // const showProduct = !vipData.length ? staticData : vipData

    return (
        <Card>
            <div className="relative py-20 min-h-[300px] md:min-h-[400px] text-center text-amber-50">
                <div className="absolute left-10 top-10 
                    w-24 h-24 
                    sm:w-32 sm:h-32 
                    md:w-40 md:h-40">
                    <img
                        src={vipFallback}
                        alt="left"
                        className="object-contain w-full"
                    />
                    <h2 className="text-lg font-semibold ">{vip.name}</h2>
                    <p className="mt-2">Duration: {vip.duration} days</p>
                </div>
                <img
                    src={leftImg}
                    alt={vip?.name}
                    className="
                        absolute 
                        right-10
                        top-32 
                        w-44 h-44          
                        sm:w-60 sm:h-60    
                        md:w-70 md:h-70    
                        object-contain
                    "
                />
            </div>

            <CardContent className="mt-40 md:mt-0 p-6 relative z-10 ">
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