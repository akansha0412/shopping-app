import { FC, ReactElement, useState } from "react";
import { BadRequest } from "../components/DesignSystem/BadRequest";
import { IProductResponse } from "../dataTypes/productType";
import { useGetProducts } from "../hooks/products";

interface IProps {
  render: (
    products: IProductResponse,
    onSearch: (value: string) => void,
    onPageChange: (page: number) => void,
    state: IState
  ) => ReactElement;
}

export interface IState {
  page: number;
  size: number;
  searchText: string;
}

export const ProductLoader: FC<IProps> = ({ render }) => {
  const [state, setState] = useState<IState>({
    page: 1,
    size: 10,
    searchText: "",
  });
  const getQuery = useGetProducts(state.page, state.size, state.searchText);

  if (getQuery.isLoading || getQuery.isIdle) {
    return null;
  }

  if (getQuery.isError) {
    console.log(getQuery.error.response?.data);
    if (getQuery.error.response?.data.code === 102) {
      return <BadRequest />;
    }
    return null;
  }

  const products: IProductResponse = getQuery.data.data;

  function onSearch(value: string) {
    setState({ ...state, page: 1, searchText: value });
  }

  function onPageChange(page: number) {
    setState({ ...state, page: page });
  }

  return render(products, onSearch, onPageChange, state);
};
