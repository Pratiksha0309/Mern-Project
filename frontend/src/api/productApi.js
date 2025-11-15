import axiosInstance from "./axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

const registerProduct = async (data) => {
  const res = await axiosInstance.post("/products", data, { auth: true });
  return res.data;
};

const getAllProducts = async () => {
  const res = await axiosInstance.get("api/product/list");
  return res.data;
};

const updateProduct = async ({ id, data }) => {
  const res = await axiosInstance.put(`/products/${id}`, data, { auth: true });
  return res.data;
};

const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`, { auth: true });
  return res.data;
};

export const useRegisterProduct = () => {
  return useMutation({
    mutationFn: registerProduct,
  });
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useUpdateProduct = (options = {}) => {
  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: updateProduct,
    ...options,
  });
};

export const useDeleteProduct = (options = {}) => {
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    ...options,
  });
};
