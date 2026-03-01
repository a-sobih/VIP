
import { vipFeatures } from "@/data/vipFeatures";
import bg from '../../assets/icons/bg.png';


const VipFeaturesSection = () => {
    return (
        <section >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {vipFeatures.map((feature) => (
                    <div
                        key={feature.id}
                        className="flex flex-col items-center justify-center"
                    >
                        {/* Wrapper */}
                        <div className="relative w-24 h-24 cursor-pointer transition-all duration-300 hover:scale-105">

                            {/* Background Image */}
                            <img
                                src={bg}
                                alt="bg"
                                className="w-full h-full object-contain"
                            />

                            {/* Centered Icon */}
                            <img
                                src={feature.icon}
                                alt={feature.name}
                                className="absolute inset-0 m-auto w-12 h-12 object-contain"
                            />

                        </div>

                        {/* Title */}
                        <span className="text-sm text-primary-light text-center font-medium mt-2">
                            {feature.name}
                        </span>
                    </div>
                ))
                }
            </div >
        </section >
    );
};

export default VipFeaturesSection;