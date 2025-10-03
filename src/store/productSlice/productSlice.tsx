import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {  Product } from "../../types/types";
import axios from "axios";

type ProductState = {
  data: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
};

const initialState: ProductState = {
  data: [],
  selectedProduct: null,
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 9,
};

const API_URL = "http://localhost:4000/product";

export const getProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const res = await axios.get(`${API_URL}/all`);
    console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch products");
  }
});

export const getProductById = createAsyncThunk<Product, number>(
  "products/fetchByID",
  async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/get/${id}`
      );
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch products");
    }
  }
);


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something wend Wrong";
      })
      // single product
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(getProductById.fulfilled, (state, action:PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load product";
      })
      
  },
});

export default productSlice.reducer;
export const { setPage } = productSlice.actions;
