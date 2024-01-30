import { SnackbarContent } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { getProductDetails, getProducts } from "../api/products";
import {
  IErrorResponse,
  IProductResponse,
  IResources,
} from "../dataTypes/productType";

export const useGetProducts = (
  page: number,
  size: number,
  searchText: string
): UseQueryResult<
  AxiosResponse<IProductResponse>,
  AxiosError<IErrorResponse>
> => {
  return useQuery(
    ["products", page, size, searchText],
    () => getProducts(page, size, searchText),
    {
      keepPreviousData: true,
      onError(err) {
        console.log(err.response?.data);
      },
    }
  );
};

export const useGetProductDetails = (
  id: number
): UseQueryResult<AxiosResponse<IResources>, AxiosError<IErrorResponse>> => {
  return useQuery(["products-detail", id], () => getProductDetails(id), {
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
};
