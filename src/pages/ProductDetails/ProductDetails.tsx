import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { getProductById } from "../../store/productSlice/productSlice";
import {  usehandleAddToCart } from "../../components/hooks/selectCart";
import type { Product } from "../../types/types";


type Props ={
  item:Product
}
const ProductDetails:React.FC<Props> = ({item}) => {
  const { id } = useParams();
  console.log("params id", id);
  const dispatch = useDispatch<AppDispatch>();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const handleAddToCart = usehandleAddToCart()

  const product = useSelector((state: RootState) => {
    if (
      state.product.selectedProduct &&
      state.product.selectedProduct._id === id
    ) {
      return state.product.selectedProduct;
    }

    return state.product.data.find((p) => p._id === id);
  });

 

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProductById(Number(id)));
    }
  }, [dispatch, id, product]);
  useEffect(() => {
    if (product) {
      const firstImage = Array.isArray(product.images)
        ? product.images[0]
        : product.images;
      setMainImage(firstImage);
    }
  }, [product]);

  console.log("product details", product);
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-amber-50 border border-gray-200 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
      {/* Image Section */}
      <div className="flex-1 text-center">
        {mainImage && (
          <img
            src={mainImage}
            alt={product.title}
            className="w-full max-w-xs h-auto object-contain rounded-lg transition-transform duration-300 hover:scale-105 mx-auto"
          />
        )}

        {/* Image Slider */}
        <div className="flex gap-3 overflow-x-auto mt-4 justify-center scrollbar-hide">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer transition-transform duration-300 
            ${
              img === mainImage
                ? "border-2 border-green-500"
                : "border-2 border-transparent"
            } 
            hover:scale-105 hover:border-blue-500`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">{product.title}</h2>
        <p className="text-lg font-medium">
          Price: <span className="text-blue-600">₹{product.price}</span>
        </p>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        {/* Optional Category */}
        {product.category && (
          <p className="text-gray-600 font-medium">
            Category: <span className="text-gray-800">{product.category}</span>
          </p>
        )}

        {/* Add to Cart Button */}
        <button
          
          className="mt-4 w-40 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors transform hover:scale-105"
          onClick={(e)=>{
            handleAddToCart(e,item)
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
