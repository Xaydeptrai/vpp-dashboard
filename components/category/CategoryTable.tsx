import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Catalog } from "@/types/catalog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { deleteCategory } from "@/api/category";
import { CategoryDialog } from "./CategoryDialog";

interface CategoryTableProps {
  title?: string;
  categoryData: Catalog[];
  onUpdate: () => void;
}

const CategoryTable = ({
  title,
  categoryData,
  onUpdate,
}: CategoryTableProps) => {
  async function deleteHandle(id: number) {
    try {
      const res = await deleteCategory(id);
      alert("Category deleted successfully.");
      onUpdate();
    } catch (error: any) {
      alert("Failed to delete category." + error.message);
    }
  }

  return (
    <div className="mt-10 mb-5">
      <div className="mb-4 flex">
        <h3 className="text-2xl font-semibold">
          {title ? title : "Categories"}
        </h3>
        <div className="ml-auto">
          <CategoryDialog title="Create Category" onSuccess={onUpdate} />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Image
                  src={category.imageUrl}
                  width={50}
                  height={50}
                  alt=""
                ></Image>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-5">
                  <CategoryDialog
                    title="Edit Category"
                    categoryData={category}
                    onSuccess={onUpdate}
                  />
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await deleteHandle(category.id);
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryTable;
