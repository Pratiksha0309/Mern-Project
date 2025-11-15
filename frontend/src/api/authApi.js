import axiosInstance from "./axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

// Register User
const registerUser = async (data) => {
  const res = await axiosInstance.post("/api/user/register", data);
  return res.data;
};

// Login User
const loginUser = async (data) => {
  const res = await axiosInstance.post("/api/user/login", data);
  return res.data;
};

// Get User Profile
const getUser = async () => {
  const res = await axiosInstance.get("/users/me", { auth: true });
  return res.data;
};

// Update User Profile
const updateUser = async (data) => {
  const res = await axiosInstance.put("/users/update", data, { auth: true });
  return res.data;
};

// React Query Hooks
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogin = (options = {}) => {
  return useMutation({
    mutationFn: loginUser,
    ...options,
  });
};

export const useGetUser = (token) => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUser,
    enabled: Boolean(token),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useUpdateUser = (options = {}) => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    ...options,
  });
};

export const authApi = { registerUser, loginUser, getUser, updateUser };
