import "../pages/ProductList/ProductList.css";
import "../App.css";
import { useEffect, useMemo } from "react";
import type { Product } from "../types/types";
import { useSelector } from "react-redux";

import { getProducts } from "../store/productSlice/productSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
// import QuantityController from "./QuantityController";

import { selectPaginatedProduct } from "./selector";
import { useAppDispatch } from "./hooks/hooks";
import {  fetchCart } from "../store/cartSlice/cartSlice";

import { usehandleAddToCart } from "./hooks/selectCart";

type ProductProps = {
  searchTerm: string;
  filters: {
    category: string[];
    priceRange: number;
  };
};

const Products: React.FC<ProductProps> = ({ searchTerm, filters }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleAddToCart = usehandleAddToCart()

  const {
    data: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.product);
  

  useEffect(() => {
    dispatch(getProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const filterProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchCategory =
        filters.category.length === 0 ||
        filters.category.includes(product.category);
      const matchPrice = product.price <= filters.priceRange;
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, searchTerm, filters]);

  // pagination
  const paginatedProduct = useSelector(selectPaginatedProduct);

  // rendering
  if (loading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }


  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filterProducts.length > 0 ? (
        paginatedProduct.map((item: Product) => {
          
          return (
            <div
              className="border border-gray-200 rounded-lg px-4 pb-4 shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white"
              key={item._id}
              onClick={() => navigate(`/productsDetails/${item._id}`)}
            >
              <img
                src={Array.isArray(item.images) ? item.images[0] : item.images}
                alt={item.title}
                className="w-full h-48 object-contain mb-3 transition-transform duration-300 hover:scale-105 rounded-xl"
              />
              <h3 className="text-gray-800 font-medium">{item.title}</h3>
              <h4 className="text-gray-600">
                <strong>{item.category}</strong>
              </h4>
              <p className="text-gray-900 font-semibold">
                Price: <strong>₹{item.price}</strong>
              </p>
              <footer className="flex justify-center items-center gap-2 mt-4">
               
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:scale-95 transition-transform duration-100"
                  onClick={(e) => {
                    
                    handleAddToCart(e, item);
                  }}
                >
                  Add Item
                </button>
              </footer>
            </div>
          );
        })
      ) : (
        <div>Data not found</div>
      )}
    </div>
  );
};

export default Products;
