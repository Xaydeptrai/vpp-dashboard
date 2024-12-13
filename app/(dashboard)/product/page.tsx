"use client";
import { fetchProduct } from "@/api/product";
import BackButton from "@/components/BackButton";
import ProductTable from "@/components/product/ProductTable";
import TablePagination from "@/components/TablePagination";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [productData, setProductData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const [debouncedProductName, setDebouncedProductName] = useState(productName);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedProductName(productName);
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [productName, minPrice, maxPrice]);

  const loadProducts = async (
    name: string,
    page: number,
    minPrice?: number,
    maxPrice?: number
  ) => {
    setLoading(true);
    try {
      const products = await fetchProduct({
        name,
        pageNumber: page,
        pageSize: 8,
        minPrice,
        maxPrice,
      });
      setProductData(products.result.items);
      setTotalPage(products.result.totalPages);
      setCurrentPage(products.result.pageNumber);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(
      debouncedProductName,
      currentPage,
      debouncedMinPrice,
      debouncedMaxPrice
    );
  }, [debouncedProductName, currentPage, debouncedMinPrice, debouncedMaxPrice]);

  // Hàm callback để làm mới danh sách sản phẩm
  const handleUpdate = () => {
    loadProducts(
      debouncedProductName,
      currentPage,
      debouncedMinPrice,
      debouncedMaxPrice
    );
  };

  return (
    <>
      <div className="max-w-[100px] items-center">
        <BackButton text="Go Back" link="/" />
      </div>
      <div className="my-3 flex flex-row gap-5">
        <div className="w-1/5">
          <Input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </div>
        <div className="w-1/6 max-w-36">
          <Input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value === "" ? 0 : Number(e.target.value));
            }}
          />
        </div>
        <div className="w-1/6 max-w-36">
          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value === "" ? 0 : Number(e.target.value));
            }}
          />
        </div>
      </div>
      {loading ? (
        <p className="justify-center my-5 text-xl">Loading...</p>
      ) : productData && productData.length > 0 ? (
        <div>
          <ProductTable productData={productData} onUpdate={handleUpdate} />
        </div>
      ) : (
        <div className="my-5 text-2xl text-center font-bold justify-center">
          Not found
        </div>
      )}
      {productData.length > 0 && !loading && (
        <TablePagination
          totalPages={totalPage === 0 ? 1 : totalPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default ProductsPage;
