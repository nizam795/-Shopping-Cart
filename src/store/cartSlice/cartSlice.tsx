import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartApiResponse, CartItem, Product } from "../../types/types";
import axios from "axios";
import type { RootState } from "../store";


type CartState = {
  items: CartItem[];
  loading: boolean;
  error?: string | null;
  message?: string | null;
};

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  message: null,
};

const API_URL = "http://localhost:4000/cart";

export const fetchCart = createAsyncThunk<CartApiResponse>(
  "cart/fetchCart",
  async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/get`, {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  }
);

export const addToCartAPI = createAsyncThunk<
  CartApiResponse,
  { product: Product; quantity: number }
>("cart/addToCartAPI", async ({ product, quantity }) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${API_URL}/add`,
    { productId: product._id, quantity },
    {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return res.data;
});

export const updateCartAPI = createAsyncThunk<
  CartApiResponse,
  { productId: string; quantity: number }
>("cart/updateCartAPI", async ({ productId, quantity }) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `${API_URL}/update`,
    { productId, quantity },
    {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return res.data;
});

export const removeCartAPI = createAsyncThunk<CartApiResponse, string>(
  "cart/removeCartAPI",
  async (productId) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_URL}/remove`, {
      data: { productId },
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.message = null;
    },
    clearCartMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartApiResponse>) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.message = action.payload.message || null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })
      .addCase(addToCartAPI.fulfilled, (state, action: PayloadAction<CartApiResponse>) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.message = action.payload.message || null;
      })
      .addCase(updateCartAPI.fulfilled, (state, action: PayloadAction<CartApiResponse>) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.message = action.payload.message || null;
      })
      .addCase(removeCartAPI.fulfilled, (state, action: PayloadAction<CartApiResponse>) => {
        state.loading = false;
        state.items = action.payload.cart;
        state.message = action.payload.message || null;
      });
  },
});

export const { clearCart ,clearCartMessage} = cartSlice.actions;
export default cartSlice.reducer;
export const selectCart = (state: RootState) => state.cart;
