
import { vipFeatures } from "@/data/vipFeatures";
import bg from '../../assets/icons/bg.png';
import { useTranslation } from "react-i18next";

const VipFeaturesSection = () => {
    const { t } = useTranslation();
    return (
        <section >
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
                {vipFeatures.map((feature) => (
                    <div
                        key={feature.id}
                        className="flex flex-col items-center justify-center"
                    >
                        {/* Wrapper */}
                        <div className="relative w-12 lg:w-20 h-12 lg:h-20 cursor-pointer transition-all duration-300 hover:scale-105">

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
                                className="absolute inset-0 m-auto w-6 lg:w-12 h-6 lg:h-12 object-contain"
                            />

                        </div>

                        {/* Title */}
                        <span className="text-sm text-primary-light text-center font-medium mt-2">
                            {t(`vipFeatures.${feature.name}`)}
                        </span>
                    </div>
                ))
                }
            </div >
        </section >
    );
};

export default VipFeaturesSection;