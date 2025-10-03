import "./ProductList.css";
// import "../../App.css";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";
import { useCallback, useState } from "react";
import ProductFilter from "../../components/ProductFilter";

const ProductList: React.FC = () => {
  // const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: [] as string[],
    priceRange: 1000,
  });
  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  const handleFilterChange = useCallback(
    (newFilter: { category: string[]; priceRange: number }) => {
      setFilters(newFilter);
    },
    []
  );

  return (
    <>
      <div>
        <div className="  mx-auto my-8 px-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Our Products
          </h1>

          <input
            type="search"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* its all about product */}
          {/* Pass searchTerm to Products */}
          <div className="w-full lg:w-1/5">
            <ProductFilter
              categories={categories}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="w-full lg:w-4/5">
            <Products searchTerm={searchTerm} filters={filters} />
          </div>
        </div>
        <div className="pagination-container">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default ProductList;
