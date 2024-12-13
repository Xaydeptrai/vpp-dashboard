"use client";
import { fetchCategory } from "@/api/category";
import BackButton from "@/components/BackButton";
import CategoryTable from "@/components/category/CategoryTable";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Hàm tải danh mục từ API
  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetchCategory();
      setCategoryData(response.result);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Hàm xử lý cập nhật danh mục
  const handleUpdate = () => {
    loadCategories(); // Tải lại dữ liệu sau khi cập nhật
  };

  return (
    <div>
      <div className="max-w-[100px] items-center">
        <BackButton text="Go Back" link="/" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CategoryTable
          categoryData={categoryData}
          title="Categories"
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
