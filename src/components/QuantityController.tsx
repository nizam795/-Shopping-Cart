import { FaPlus, FaMinus } from "react-icons/fa6";
import "../App.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Product } from "../types/types";
import {
  addToCartAPI,
  removeCartAPI,
  updateCartAPI,
} from "../store/cartSlice/cartSlice";
import React from "react";
import { useAppDispatch } from "./hooks/hooks";
import { selectCartItemById } from "./hooks/selectCart";
type QuantityProps = {
  item: Product;
};

const QuantityController: React.FC<QuantityProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const cartItem = useSelector((state: RootState) =>
    selectCartItemById(state,item._id)
  );
  console.log("cartItem datat", cartItem);
  const quantity = cartItem?.quantity ?? 0;

  const handleIncrease = () => {
    
    if (!item._id) return console.log("No product found");
    if (quantity === 0) {
      dispatch(addToCartAPI({ product: item, quantity: 1 }));
    } else {
      dispatch(updateCartAPI({ productId: item._id, quantity: quantity + 1 }));
    }
  };

  const handleDecrease = () => {
 

    if (!item._id) return;
    if (quantity === 1) {
      dispatch(removeCartAPI(item._id));
      console.log("sdjf", item);
    } else if(quantity >1){
      dispatch(updateCartAPI({ productId: item._id, quantity: quantity - 1 }));
      //   console.log(item)
    }
  };
  return (
    <>
      <div className="flex items-center gap-2 justify-center">
        <button
          className="h-7 w-7 flex items-center justify-center rounded-full border border-black bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            handleDecrease();
          }}
        >
          <FaMinus />
        </button>
        <div className="h-7 w-7 flex items-center justify-center border border-black rounded bg-white font-medium">
          {quantity}
        </div>
        <button
          className="h-7 w-7 flex items-center justify-center rounded-full border border-black bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            handleIncrease();
          }}
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
};

export default QuantityController;
