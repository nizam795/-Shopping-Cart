// import type { Middleware } from "@reduxjs/toolkit";

// export const cartMiddleware: Middleware =
//   (storeAPI) => (next) => (action) => {
//     const result = next(action);

//     const cartActions = [
//       "cart/addToCartAPI/fulfilled",
//       "cart/removeCartAPI/fulfilled",
//       "cart/updateCartAPI/fulfilled",
//     ];
//     if (typeof action === "object" && action != null && "type" in action) {
//       if (cartActions.includes(action.type as string)) {
//         const cart = storeAPI.getState().cart.items;
//         try {
//           if (cart) {
//             localStorage.setItem("cart", JSON.stringify(cart));
//           } else {
//             localStorage.removeItem("cart");
//           }
//           // console.log("local storage",cartItems)
//         } catch (err) {
//           console.warn("Failed to save cart:", err);
//         }
//       }
//     }

//     return result;
//   };
// // export const loadCartFromLocalStorage = () => {
// //   try {
// //     const storedCart = localStorage.getItem("cart");
// //    // Explicitly check for the string 'undefined'
// //     if (storedCart === "undefined" || storedCart === null) {
// //       return null;
// //     }

// //     // Attempt to parse the valid JSON string
// //     return JSON.parse(storedCart)
// //   } catch (err) {
// //     console.warn("Failed to load cart:", err);
// //     return null;
// //   }
// // };
