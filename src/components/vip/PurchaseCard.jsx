import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { buyVip, sendVip } from "@/services/vip-service"
import { useState } from "react"
import toast from "react-hot-toast"
import FriendCombobox from "./FriendCombobox"

export default function PurchaseStickyCard({ activeVip }) {
    const [open, setOpen] = useState(false)
    const [actionType, setActionType] = useState(null)
    const [selectedDuration, setSelectedDuration] = useState("month")
    const [loadingAction, setLoadingAction] = useState(false);
    const [receiverId, setReceiverId] = useState("");

    const handleOpen = (type) => {
        setActionType(type)
        setOpen(true)
    }

    const durationMap = {
        day: 1,
        week: 7,
        "15_days": 15,
        month: 30,
    };

    const handleConfirmAction = async () => {
        if (!activeVip) return;
        if (actionType === "send" && !receiverId) {
            toast.error("Please enter receiver ID");
            return;
        }

        setLoadingAction(true);
        try {
            const formData = new FormData();

            if (actionType === "send") {
                formData.append("receiver_id", String(receiverId));
                formData.append("duration", String(durationMap[selectedDuration]));
                formData.append("vip_type_id", String(activeVip.id));

                await sendVip(formData);
                console.log(formData)
                toast.success("VIP sent successfully 🎁");
            } else {
                formData.append("duration", String(durationMap[selectedDuration]));
                formData.append("vip_type_id", String(activeVip.id));

                await buyVip(formData);
                toast.success("VIP purchased successfully 🚀");
            }
            setOpen(false);
            setReceiverId(""); // تفريغ الحقل بعد الإرسال
            console.log("Confirmed:", actionType);
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong");
        } finally {
            setLoadingAction(false);
        }
    }
    return (
        <>
            {/* Sticky Bottom Card */}
            <div className="
                    fixed bottom-5 left-1/2 -translate-x-1/2 w-[95%] md:w-[60%] z-50
                    backdrop-blur-xl
                    bg-gradient-to-r from-[#2A1A0E]/90 to-[#5C3A1C]/90
                    border border-white/10
                    shadow-2xl
                    rounded-lg
                ">
                <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
                    <div>
                        <p className="text-white/80 text-sm">
                            Price: {activeVip?.price_in_month} Coins / 30 Days
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={() => handleOpen("send")}
                            className="bg-white text-black hover:bg-white/80"
                        >
                            Send
                        </Button>

                        <Button
                            onClick={() => handleOpen("become")}
                            className="bg-primary text-white hover:opacity-90"
                        >
                            Become
                        </Button>
                    </div>
                </div>
            </div>

            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen} modal={false}>
                <DialogContent className="w-full max-w-[95%] md:max-w-4xl backdrop-blur-xl shadow-2xl
                    bg-gradient-to-r from-[#2A1A0E]/90 to-[#5C3A1C]/90 border-white/10">
                    <DialogHeader className="text-white">
                        <DialogTitle >
                            {actionType === "send" ? "Confirm Send" : "Confirm Purchase"}
                        </DialogTitle>
                        <DialogDescription className="text-white/70">
                            You are about to {actionType} the {activeVip?.name} package.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 text-white">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Per Day", value: activeVip?.price_in_day, key: "day" },
                                { label: "Per Week", value: activeVip?.price_in_week, key: "week" },
                                { label: "Per 15 Days", value: activeVip?.price_in_15_days, key: "15_days" },
                                { label: "Per Month", value: activeVip?.price_in_month, key: "month" },
                            ].map(option => (
                                <button
                                    key={option.key}
                                    type="button"
                                    className={`
                                        w-full border rounded-lg px-4 py-3 text-center
                                        transition-all cursor-pointer
                                        ${selectedDuration === option.key ? 'border-primary bg-primary text-white scale-105 shadow-lg' : 'border-white/20 bg-white/10 text-white/80'}
                                    `}
                                    onClick={() => setSelectedDuration(option.key)}
                                >
                                    <span className="block font-medium">{option.label}</span>
                                    <span className="block text-xl font-semibold">
                                        {option.value} Coins
                                    </span>
                                </button>
                            ))}
                        </div>
                        {actionType === "send" && (
                            <div className="mt-4">
                                <FriendCombobox
                                    setReceiverId={setReceiverId}
                                />
                            </div>
                        )}
                        <div className="mt-6 text-center">
                            <p className="text-lg font-semibold">
                                Total Price:{" "}
                                {
                                    selectedDuration === "day" ? activeVip?.price_in_day :
                                        selectedDuration === "week" ? activeVip?.price_in_week :
                                            selectedDuration === "15_days" ? activeVip?.price_in_15_days :
                                                selectedDuration === "month" ? activeVip?.price_in_month :
                                                    "--"
                                } Coins
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="mx-auto">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-white/30 text-white cursor-pointer"
                        >
                            No
                        </Button>

                        <Button
                            onClick={handleConfirmAction}
                            disabled={loadingAction}
                            className="bg-primary text-white cursor-pointer"
                        >
                            {loadingAction ? "Processing..." : "Yes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}