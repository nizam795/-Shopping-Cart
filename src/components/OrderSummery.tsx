import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";



type OrderSummeryProps = {
  originalPrice : number,
  discount:number,
  tax:number,
  pickupFee?:number,
  onCheckOut: ()=>void

}
const OrderSummery:React.FC<OrderSummeryProps> = ({
  originalPrice,
  discount,
  tax,
  pickupFee =0,
  onCheckOut
}) =>
   {

const cartItem = useSelector((state:RootState)=>state.cart.items)
console.log("cartItem",cartItem)

  const total =originalPrice  -discount + tax + pickupFee;
  

  return (
    <div className="border border-gray-200 rounded-2xl p-6 w-full   bg-white shadow-md mx-auto h-fit">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Order Summary
      </h1>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Original Price</p>
          <p className="text-gray-800 font-medium">₹{originalPrice}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">Saving</p>
          <p className="text-green-600 font-medium">-₹{discount}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">Store Pickup</p>
          <p className="text-gray-800 font-medium">₹{pickupFee}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">Tax</p>
          <p className="text-gray-800 font-medium">₹{tax}</p>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="flex justify-between items-center text-lg font-semibold">
        <p className="text-gray-700">Total</p>
        <p className="text-gray-900">₹{total}</p>
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition duration-200"
        onClick={onCheckOut}
        >
          Proceed to Checkout

        </button>
      </div>

      <p className="text-center mt-4 text-sm text-blue-600 font-semibold cursor-pointer">
        <span className="text-gray-700 font-medium">Or</span> Continue Shopping
      </p>
    </div>
  );
};

export default OrderSummery;
