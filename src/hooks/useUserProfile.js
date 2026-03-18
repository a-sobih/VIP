import { getCurrentUser } from "@/services/vip-service";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useUserProfile = () => {
  const { userId } = useSelector((state) => state.auth);
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getCurrentUser(userId),
    enabled: !!userId,
  });
};
