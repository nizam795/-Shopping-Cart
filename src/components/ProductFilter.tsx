import { useEffect, useState } from "react";

type ProductFilterProp = {
  categories: string[];
  onFilterChange: (filter: { category: string[]; priceRange: number }) => void;
};

const ProductFilter: React.FC<ProductFilterProp> = ({
  categories,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(500); // max price filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    onFilterChange({
      category: selectedCategories,
      priceRange,
    });
  }, [selectedCategories, priceRange, onFilterChange]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-700">
        Filter by Category
      </h3>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
          >
            <input
              type="checkbox"
              value={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              className="w-4 h-4 accent-blue-500 cursor-pointer"
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-gray-700 font-medium">
          Price Range: Up to ₹{priceRange}
        </h3>
        <input
          type="range"
          min={0}
          max={500}
          step={50}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
    </div>
  );
};

export default ProductFilter;
