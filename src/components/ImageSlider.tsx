
import {  useSelector } from "react-redux";
import "../pages/ProductDetails/productDetails.css";
import type {  RootState } from "../store/store";
import React from "react";


interface ImageSlideprops {
  images:string[];
  onImageSelect: (image: string) => void;
}
const ImageSlider: React.FC<ImageSlideprops> = ({ onImageSelect,images }) => {
  if(!images || images.length === 0) return null
  const loading = useSelector((state: RootState) => state.product.loading);
  if (loading) return <p>Loading images...</p>;
  return (
    <div className="image-slider-container">
      <div className="small-image-container">
        {images.map((img: string, index: number) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            className="small-image-slide"
            onClick={() => onImageSelect(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
