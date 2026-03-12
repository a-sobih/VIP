import VIPTabs from "@/components/vip/VipTabs";

import bgFallback from "@/assets/img/hero1.png"
import { checkImage } from "@/utils/checkImage";

import { getVipTypes } from "@/services/vip-service";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setVipData } from "@/rtk/features/vipSlice";
import VIPCard from "@/components/vip/VIPCard";
import PurchaseStickyCard from "@/components/vip/PurchaseCard";
import { vipImages } from "@/data/vipImages";


function HomePage() {
  const dispatch = useDispatch();
  const { vipData, activeVipId } = useSelector((state) => state.vip);
  const [loading, setLoading] = useState(true);

  const activeVip = vipData.find((v) => v.id === activeVipId);

  const { bg, overlayColor } = (activeVip && vipImages[activeVip.id]) ? vipImages[activeVip.id] : {};

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
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Hero section */}
      <div className="relative p-6 h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 h-[60%] lg:h-full">
          <img
            src={bg}
            fetchPriority="high"
            alt="hero"
            className="w-full h-full md:object-cover"
          />
          {/* Bottom Brown Blur Effect */}
          <div
            className="absolute bottom-0 left-0 w-full h-40"
            style={{
              background: `linear-gradient(to top, ${overlayColor} 0%, transparent 100%)`,
            }}
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

      <PurchaseStickyCard activeVip={activeVip} />
    </div>
  );
}

export default HomePage;
