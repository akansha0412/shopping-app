import { FC, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { addItemToCart } from "../api/cart";
import { useCart } from "../contexts/CartContext";
import { IResources } from "../dataTypes/productType";
import { useGetProductDetails } from "../hooks/products";

interface IProps {
  render: (
    product: IResources,
    addItem: (productId: number) => void
  ) => ReactElement;
}

export const ProductDetailsLoader: FC<IProps> = ({ render }) => {
  const { id: productId } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const getQuery = useGetProductDetails(Number(productId));

  if (getQuery.isLoading || getQuery.isIdle) {
    return null;
  }

  if (getQuery.isError) {
    return null;
  }

  const product: IResources = getQuery.data.data;

  function addItem(productId: number) {
    addItemToCart(productId).then(() => {
      addToCart({ id: productId, quantity: 1 });
    });
  }

  return render(product, addItem);
};
