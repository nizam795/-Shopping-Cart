import "./crudMaster.css";
import "../../App.css";
import { CiEdit } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import AddProductModal from "../../components/AddProductModal";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  deleteproduct,
  getProducts,
} from "../../store/productSlice/productSlice";
import type { Product } from "../../types/types";
import EditDataModal from "../../components/EditDataModal";

const CrudMaster = () => {
  const [modalType, setisModalType] = useState<"add" | "edit" | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteproduct(id));
    console.log("delete id", id);
  };

  return (
    <>
      <div className="todo-container">
        <div className="todo-add-container">
          <h2>TODO</h2>
          <div className="button-search-container">
            <button
              className="product-btn"
              onClick={() => setisModalType("add")}
            >
              Add Product
            </button>
            <input type="search" placeholder="Search product " name="" id="" />
          </div>
        </div>
        <div className="table-responsive">
          <table className="product-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} style={{ color: "red", textAlign: "center" }}>
                    {error}
                  </td>
                </tr>
              ) : (
                products.map((product: Product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td>{product.price}</td>
                    <td>{product.category.name}</td>
                    <td className="action-btn">
                      <button onClick={() => setisModalType("edit")}>
                        <CiEdit size={18} />
                      </button>
                      <button>
                        <IoEyeSharp size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)}>
                        <MdOutlineDeleteOutline size={18} color="red" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {modalType === "add" && (
        <AddProductModal
          isOpen={true}
          onClose={() => setisModalType(null)}
          onSubmit={() => {}}
        />
      )}

      {modalType === "edit" && (
        <EditDataModal
          isOpen={true}
          onClose={() => setisModalType(null)}
          onSubmit={() => {}}
        />
      )}
    </>
  );
};

export default CrudMaster;
