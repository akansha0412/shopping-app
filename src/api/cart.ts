import axios, { AxiosResponse } from "axios";
import { customAxios } from "../utils/commonUtils";
import { ICart, ICartData } from "../dataTypes/cartTypes";

export const getCartData = (): Promise<AxiosResponse<ICartData>> => {
  return customAxios.get(`/cart`);
};

export const addItemToCart = (id: number): Promise<AxiosResponse<ICart>> => {
  return customAxios.post(`/cart`, { id, quantity: 1 });
};

export const deleteItemFromCart = (
  id: number
): Promise<AxiosResponse<ICart>> => {
  return customAxios.delete(`/cart/${id}`);
};

export const updateQuantity = (
  id: number,
  quantity: number
): Promise<AxiosResponse<ICart>> => {
  return customAxios.put(`/cart/`, { id, quantity });
};
