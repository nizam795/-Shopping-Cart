import { useDispatch, useSelector } from "react-redux";
import "./Pagination.css";
import { selectedtotalPages } from "./selector";
import type { RootState } from "../store/store";
import { setPage } from "../store/productSlice/productSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const totalpages = useSelector(selectedtotalPages);
  const currentPage = useSelector(
    (state: RootState) => state.product.currentPage
  );

  return (
    <div className="pagination-container">
      {Array.from({ length: totalpages }, (_, i) => (
        <button
          key={i}
          onClick={() => dispatch(setPage(i + 1))}
          className={currentPage === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
