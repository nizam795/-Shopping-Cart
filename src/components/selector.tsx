import type { RootState } from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

const selectProductData = (state:RootState)=>state.product.data;
const selectCurrentPage = (state:RootState)=>state.product.currentPage;
const selectItemPerPage = (state:RootState)=>state.product.itemsPerPage


export const selectPaginatedProduct =createSelector(
  [selectProductData,selectCurrentPage,selectItemPerPage],
  (data,currentPage,itemPerPage)=>{
    const start = (currentPage - 1) * itemPerPage;
    const end = start + itemPerPage;
    return data.slice(start,end)
  } 
)
export const selectedtotalPages = (state: RootState) => {
  return Math.ceil(state.product.data.length / state.product.itemsPerPage);
};
  