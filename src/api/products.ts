import { IProductResponse, IResources } from "../dataTypes/productType";
import { AxiosResponse } from "axios";
import { customAxios } from "../utils/commonUtils";

export const getProducts = (
  page: number,
  size: number,
  code: string
): Promise<AxiosResponse<IProductResponse>> => {
  const params: {
    page: number;
    size: number;
    code?: string;
  } = { page, size };

  if (code) params["code"] = code;

  return customAxios.get(`/products`, { params });
};

export const getProductDetails = (
  id: number
): Promise<AxiosResponse<IResources>> => {
  return customAxios.get(`/products/${id}`);
};
