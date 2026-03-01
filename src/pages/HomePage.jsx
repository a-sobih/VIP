import VIPTabs from "@/components/vip/VipTabs";

import bgFallback from "@/assets/img/hero1.png"
import { checkImage } from "@/utils/checkImage";

import { getVipTypes } from "@/services/vip-service";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useSelector, useDispatch } from "react-redux";
import { setVipData } from "@/rtk/features/vipSlice";
import VIPCard from "@/components/vip/VIPCard";


function HomePage() {
  const dispatch = useDispatch();
  const { vipData, activeVipId } = useSelector((state) => state.vip);
  const [loading, setLoading] = useState(true);

  const [bgImage, setBgImage] = useState(bgFallback);

  const activeVip = vipData.find((v) => v.id === activeVipId);

  useEffect(() => {
    const updateBg = async () => {
      if (activeVip?.image) {
        const isValid = await checkImage(activeVip.image);
        setBgImage(isValid ? activeVip.image : bgFallback);
      } else {
        setBgImage(bgFallback);
      }
    };

    updateBg();
  }, [activeVip]);

  useEffect(() => {
    const fetchVIP = async () => {
      try {
        const res = await getVipTypes();
        dispatch(setVipData(res.data));
        console.log(res); // شوف الداتا

      } catch (error) {
        console.error("VIP ERROR:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVIP();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="relative">
      {/* Overlay */}
      <div className="fixed inset-0 bg-[rgb(35,21,6)] z-0 pointer-events-none" />

      {/* Hero section */}
      <div className="relative p-6 h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 h-full">
          <img
            src={bgImage}
            alt="hero"
            className="w-full h-full md:object-cover"
          />
          {/* Bottom Brown Blur Effect */}
          <div
            className="
            absolute 
            bottom-0 
            left-0 
            w-full 
            h-40 
            bg-gradient-to-t 
           from-[rgb(35,21,6)]/90  to-transparent
          "
          />
        </div>

        {/* Tabs */}
        <div className="relative z-10 ">
          <VIPTabs />
        </div>

        {/* VIP Content */}
        <div className="mt-6">
          {activeVip && <VIPCard vip={activeVip} />}
        </div>
      </div>


    </div>
  );
}

export default HomePage;
