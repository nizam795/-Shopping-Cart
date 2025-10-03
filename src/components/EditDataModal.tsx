import React, { useEffect } from "react";
import Modal from "react-modal";
import "../pages/CRUDMaster/crudMaster.css";
import { useForm } from "react-hook-form";
import type { Product } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store/productSlice/productSlice";
import type { AppDispatch, RootState } from "../store/store";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
};

const customStyles = {
  content: {
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    // padding: "20px",
    height: "25rem",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");
const EditDataModal: React.FC<ProductModalProps> = ({ isOpen, onClose ,onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const dispatch = useDispatch<AppDispatch>();
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  useEffect(() => {
    if (isOpen && selectedProduct) {
      reset(selectedProduct);
    }
  }, [isOpen, selectedProduct, reset]);

  const EditSubmitHandler = (data: Product) => {
    if (!data.id) return;
    dispatch(updateProduct({ id: data.id, data }));
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="modal-container">
        <h2 className="modal-title">Edit Product</h2>
        <form className="modal-form" onSubmit={handleSubmit(EditSubmitHandler)}>
          <input
            {...register("title", { required: "Product name is required" })}
            placeholder="Product name"
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
          <div className="inner-input">
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              placeholder="Price"
            />
            {errors.price && <p className="error">{errors.price.message}</p>}

            <input
              {...register("category", { required: "Category is required" })}
              placeholder="Category"
            />
            {errors.category && (
              <p className="error">{errors.category.message}</p>
            )}
          </div>
          <input
            type="url"
            {...register("image", { required: "Image URL is required" })}
            placeholder="Image URL"
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={onClose}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditDataModal;
