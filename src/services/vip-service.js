// vip-service.js
import api from "./api";

// GET CURRENT USER
export const getCurrentUser = async () => {
    const userId = localStorage.getItem("userId")
    const response = await api.get(`/profile/${userId}`);
    return response.data.data;
};

const user = await getCurrentUser();

// const userId = user.id;

// GET VIP TYPES
export const getVipTypes = async () => {
    const response = await api.get("/vip-types");
    return response.data;
};

// POST SEND VIP
export const sendVip = async (formData) => {
    const response = await api.post("/send-vip-gift", formData);
    return response.data;
};

// POST BUY VIP
export const buyVip = async (formData) => {
    const response = await api.post("/buy-vip", formData);
    return response.data;
};

// GET FRIENDS
export const getFriends = async (userId) => {
    const response = await api.get(`/get-friends/${userId}`);
    return response.data.data;
};