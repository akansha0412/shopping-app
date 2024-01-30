// CartContext.tsx
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { IItem } from "../dataTypes/cartTypes";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartContextProps {
  cartState: CartState;
  addToCart: (item: CartItem) => void;
  deleteFromCart: (item: CartItem) => void;
  updateCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (
  state: CartState,
  action: { type: string; payload: CartItem }
): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

interface IProps {
  children: ReactNode;
}

const CartProvider: React.FC<IProps> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item: CartItem): void => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const deleteFromCart = (item: CartItem): void => {
    dispatch({ type: "DELETE_FROM_CART", payload: item });
  };

  const updateCart = (item: CartItem): void => {
    dispatch({ type: "UPDATE_CART", payload: item });
  };

  return (
    <CartContext.Provider
      value={{ cartState, addToCart, deleteFromCart, updateCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
