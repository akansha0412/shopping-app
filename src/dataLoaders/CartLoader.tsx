import { FC, ReactElement } from "react";
import { deleteItemFromCart, updateQuantity } from "../api/cart";
import { useCart } from "../contexts/CartContext";
import { ICartData } from "../dataTypes/cartTypes";
import { useGetCartDetails } from "../hooks/carts";

interface IProps {
  render: (
    cartDetail: ICartData,
    deleteItem: (productId: number) => void,
    updateItem: (productId: number, quantity: number) => void
  ) => ReactElement;
}

export const CartLoader: FC<IProps> = ({ render }) => {
  const { deleteFromCart, updateCart } = useCart();
  const getQuery = useGetCartDetails();

  if (getQuery.isLoading || getQuery.isIdle) {
    return null;
  }

  if (getQuery.isError) {
    return null;
  }

  const cartDetail: ICartData = getQuery.data.data;

  function deleteItem(productId: number) {
    deleteItemFromCart(productId).then(() => {
      deleteFromCart({ id: productId, quantity: 1 });
      getQuery.refetch();
    });
  }

  function updateItem(productId: number, quantity: number) {
    updateQuantity(productId, quantity).then(() => {
      updateCart({ id: productId, quantity: quantity });
      getQuery.refetch();
    });
  }

  return render(cartDetail, deleteItem, updateItem);
};
