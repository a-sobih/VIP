import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VIPCard from './VIPCard';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveVip } from "@/rtk/features/vipSlice";
import { useTranslation } from "react-i18next";

const scrollAmount = 200;

const VIPTabs = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const dispatch = useDispatch();
  const { vipData: vipList, activeVipId } = useSelector((state) => state.vip);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const activeVip = vipList.find((v) => v.id === activeVipId);
  return (
    <Tabs defaultValue={vipList[0]?.name} className="w-full">
      <div className="relative ">

        {/* Scrollable Tabs */}
        <div ref={scrollRef} className="overflow-x-auto hide-scrollbar pb-2 flex justify-start gap-2 items-center "
          dir={isRTL ? "rtl" : "ltr"}
        >
          <TabsList className="inline-flex w-max mx-auto py-4 px-4 md:px-6 rounded-xl gap-1 md:gap-2 bg-white/10 backdrop-blur-md shadow-lg">

            {vipList.map((vip) => (

              <TabsTrigger
                key={vip.id}
                value={vip.id}
                className={`
                whitespace-nowrap px-3 md:px-6 lg:px-8 py-4 text-sm sm:text-base font-medium transition-all duration-200
                ${activeVipId === vip.id ? "bg-white text-gray-900 shadow-lg" : "text-white/70 hover:text-white hover:bg-white/10"}
                rounded-lg cursor-pointer
              `}
                onClick={() => dispatch(setActiveVip(vip.id))}
              >
                <span className="text-sm md:text-lg">{vip.name}</span>

              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
    </Tabs >
  );
};

export default VIPTabs;