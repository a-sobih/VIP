import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VIPCard from './VIPCard';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveVip } from "@/rtk/features/vipSlice";

const scrollAmount = 200;

const VIPTabs = () => {
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
      <div className="relative px-10">

        {/* Left Arrow – Mobile Only */}
        <button
          onClick={() => scroll("left")}
          className="
          md:hidden
          absolute -left-[10px] top-1/3 -translate-y-1/2 z-20
          bg-white/40 backdrop-blur-md
          p-2 rounded-full text-white cursor-pointer
        "
        >
          <ChevronLeft size={18} />
        </button>

        {/* Right Arrow – Mobile Only */}
        <button
          onClick={() => scroll("right")}
          className="
          md:hidden
          absolute -right-[10px] top-1/3 -translate-y-1/2 z-20
          bg-white/40 backdrop-blur-md
          p-2 rounded-full text-white cursor-pointer
        "
        >
          <ChevronRight size={18} />
        </button>

        {/* Scrollable Tabs */}
        <div ref={scrollRef} className="overflow-x-auto hide-scrollbar pb-2 flex justify-between items-center">
          <TabsList className="inline-flex w-max mx-auto py-4 px-6 rounded-xl gap-4 bg-white/10 backdrop-blur-md">
            {vipList.map((vip) => (
              <TabsTrigger
                key={vip.id}
                value={vip.id}
                className={`
                whitespace-nowrap px-8 py-4 text-sm sm:text-base font-medium transition-all duration-200
                ${activeVipId === vip.id ? "bg-white text-gray-900 shadow-lg" : "text-white/70 hover:text-white hover:bg-white/10"}
                rounded-lg cursor-pointer
              `}
                onClick={() => dispatch(setActiveVip(vip.id))}
              >
                <span className="text-lg sm:text-xl">{vip.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
    </Tabs >
  );
};

export default VIPTabs;