import type React from "react";
import type { Product } from "../../types/types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import toast from "react-hot-toast";
import { useAppDispatch } from "./hooks";
import { addToCartAPI } from "../../store/cartSlice/cartSlice";

export const usehandleAddToCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: Product
  ) => {
    e.stopPropagation();
    const alreadyExists =
      Array.isArray(cartItems) &&
      cartItems.some((cartItem) => cartItem._id === item._id);
    if (alreadyExists) {
      toast.error("Product already added");
    } else {
      dispatch(addToCartAPI({ product: item, quantity: 1 }));
      toast.success("Product added successfully");
    }
  };
  return handleAddToCart;
};
