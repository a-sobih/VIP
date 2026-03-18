import { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { getFriends } from "@/services/vip-service";
import img from "@/assets/img/vip1Badge.png";
import { useSelector } from "react-redux";

export default function FriendCombobox({ setReceiverId }) {
  const [friends, setFriends] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // للباك
  const [selectedName, setSelectedName] = useState(""); // للعرض في input
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getFriends(userId);
        setFriends(data?.data || data);
      } catch (err) {
        console.error("Friends error:", err);
      }
    };
    fetchFriends();
  }, [userId]);

  return (
    <div className="mt-4">
      <label className="block text-white mb-2">Search Friend</label>

      <Combobox
        items={friends}
        value={selectedId} // نخزن id كـ value
        onValueChange={(id) => {
          const friend = friends.find((f) => f.id === id);
          setSelectedId(id); // للباك
          setSelectedName(friend?.name || ""); // للعرض
          setReceiverId(id); // نبعت id للباك
        }}
        itemToStringValue={(friend) => friend?.name || ""}
      >
        <ComboboxInput
          placeholder="Search by name..."
          value={selectedName} // هنا الاسم للعرض
          onChange={(e) => setSelectedName(e.target.value)} // ممكن تدير فلترة لو حابب
          className="bg-white/10 text-white border-white/30"
        />

        <ComboboxContent>
          <ComboboxEmpty className="text-white bg-[#8B5A2B]/20 backdrop-blur-xl">
            No friends found.
          </ComboboxEmpty>

          <ComboboxList className="gap-2 flex flex-col border border-white/10 bg-[#8B5A2B]/20 backdrop-blur-xl">
            {(friend) => (
              <ComboboxItem
                key={friend.id}
                value={friend.id}
                className="flex items-center gap-3 shadow-md cursor-pointer border border-white/10"
              >
                <img
                  src={friend.photo_url}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex flex-col text-sm">
                  <span className="text-white font-medium">{friend.name}</span>
                  <span className="text-white/60 text-xs">{friend.email}</span>
                  <span className="text-white/40 text-xs">
                    UID: {friend.uid}
                  </span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
