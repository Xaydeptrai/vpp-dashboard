"use client";
import { fetchCategory } from "@/api/category";
import BackButton from "@/components/BackButton";
import CategoryTable from "@/components/category/CategoryTable";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const loadCategories = async () => {
    const response = await fetchCategory();
    setCategoryData(response.result);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleUpdate = () => {
    loadCategories();
  };

  return (
    <div>
      <div className="max-w-[100px] items-center">
        <BackButton text="Go Back" link="/" />
      </div>
      <CategoryTable
        categoryData={categoryData}
        title="Categories"
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default CategoriesPage;
