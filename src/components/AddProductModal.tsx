import React from "react";
import Modal from "react-modal";
import "../pages/CRUDMaster/crudMaster.css";
import { useForm } from "react-hook-form";
import type { Product } from "../types/types";

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
    width: "50%",
    // padding: "20px",
    height: "25rem",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#root");

const AddProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const submitHandler = (data: Product) => {
    onSubmit(data);
    reset();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="modal-container">
        <h2 className="modal-title">Add Product</h2>
        <form className="modal-form" onSubmit={handleSubmit(submitHandler)}>
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
            {...register("images", { required: "Image URL is required" })}
            placeholder="Image URL"
          />
          {errors.images && <p className="error">{errors.images.message}</p>}
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

export default AddProductModal;
