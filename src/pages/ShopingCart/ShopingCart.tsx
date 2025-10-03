import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { CartItem } from "../../types/types";

import {
  clearCartMessage,
  fetchCart,
  removeCartAPI,
  updateCartAPI,
} from "../../store/cartSlice/cartSlice";
import { useAppDispatch } from "../../components/hooks/hooks";
import { useEffect, useState } from "react";
import OrderSummery from "../../components/OrderSummery";

const ShopingCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const error = useSelector((state: RootState) => state.cart.error);
  const message = useSelector((state: RootState) => state.cart.message);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearCartMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);
  const handleUpdate = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdatingId(productId);
    await dispatch(updateCartAPI({ productId, quantity }));
    setUpdatingId(null);
  };
  const handleRemove = async (productId: string) => {
    setUpdatingId(productId);
    await dispatch(removeCartAPI(productId));
    setUpdatingId(null);
  };
  const originalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log("orignal price",originalPrice)

  // If your API already returns subtotal, you can use item.subtotal:
  const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  console.log("subtotal",subtotal)

  const discount = 50; // You can calculate based on offers, or keep 0 if none
  const tax = Math.round(subtotal * 0.1); // Example 10% tax

  return (
    <div className="flex flex-col lg:flex-row flex-wrap mx-4 sm:mx-6 lg:mx-10 mt-6 lg:mt-10 justify-between gap-6">
      <div className="flex flex-col gap-4 w-full lg:w-[60%] h-fit p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-500">Loading your cart...</div>
        )}

        {/* Error State (example: token expired) */}
        {error && (
          <div className="text-center text-red-500">
            {error.includes("jwt expired")
              ? "Session expired. Please login again."
              : error}
          </div>
        )}
        {message && <div className="text-center text-green-500">{message}</div>}
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item: CartItem) => (
            <div
              key={item._id}
              className="flex  flex-wrap items-center justify-between border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 shadow-sm  w-auto"
            >
              {/* Product Image */}
              <img
                src={item.images[0]}
                // src={Array.isArray(item.images) ? item.images[0] : item.images}
                alt={item.title}
                className="w-20 h-20 object-contain mr-4 rounded-2xl "
              />

              {/* About Product */}
              <div className="flex-1 flex-col ">
                <h2 className="text-md font-semibold ">{item.title}</h2>
                <p className="text-sm">
                  Category: <strong>{item.category}</strong>
                </p>
                <p className="text-sm">
                  Price: <strong>₹{item.subtotal}</strong>
                </p>
              </div>

              {/* Buttons */}
              <footer className="flex items-center gap-3 min-w-[150px] mt-3 sm:mt-0">
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  disabled={updatingId === item._id}
                  onChange={(e) =>
                    handleUpdate(item._id, Number(e.target.value))
                  }
                  className="w-15 px-2 py-1 border border-gray-300 text-sm rounded-md text-center "
                />
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-md font-medium hover:bg-red-600 transition-colors text-sm"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </footer>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Your cart is empty</div>
        )}
      </div>
      <div className="w-full lg:w-[35%]">
        <OrderSummery
          originalPrice={originalPrice}
          discount={discount}
          tax={tax}
          onCheckOut={() => console.log("Go to checkout page")}
          // onCheckout={() => navigate("/checkout")}
        />
      </div>
    </div>
  );
};

export default ShopingCart;
