// import React from 'react'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setPage } from "../../store/productSlice/productSlice";
import type { AppDispatch, RootState } from "../../store/store";
import {
  selectedtotalPages,
  selectPaginatedProduct,
} from "../../components/selector";
// import "./productGallary.css"

const ProductGallary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const paginatedProduct = useSelector(selectPaginatedProduct);
  const totalpages = useSelector(selectedtotalPages);
  const currentPage = useSelector(
    (state: RootState) => state.product.currentPage
  );
  const loading = useSelector((state: RootState) => state.product.loading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
  <div className=" max-w-6xl mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold text-center mb-6">Product Gallery</h2>

  {loading ? (
    <p className="text-center text-gray-500">Loading...</p>
  ) : (
    <>
      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {paginatedProduct.map((product) => (
          <div
            key={product._id}
            className=" border border-gray-200 rounded-lg p-4 text-center shadow hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className=" object-contain mx-auto mb-3 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-gray-800 font-medium">{product.title}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className=" flex justify-center mt-8 flex-wrap gap-2">
        {Array.from({ length: totalpages }, (_, i) => (
          <button
            key={i}
            onClick={() => dispatch(setPage(i + 1))}
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  )}
</div>
  );
};

export default ProductGallary;
