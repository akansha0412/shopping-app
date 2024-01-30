import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { getCartData } from "../api/cart";
import { ICartData } from "../dataTypes/cartTypes";
import { IErrorResponse } from "../dataTypes/productType";

export const useGetCartDetails = (): UseQueryResult<
  AxiosResponse<ICartData>,
  AxiosError<IErrorResponse>
> => {
  return useQuery(["cart-detail"], () => getCartData(), {
    keepPreviousData: true,
    onError(err) {
      console.log(err);
    },
  });
};
