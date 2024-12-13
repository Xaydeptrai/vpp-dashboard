import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Product } from "@/types/product";
import { Button } from "../ui/button";
import Image from "next/image";
import { Trash } from "lucide-react";
import { deleteProduct } from "@/api/product";
import { ProductDialog } from "./ProductDialog";

interface ProductsTableProps {
  title?: string;
  productData: Product[];
  onUpdate: () => void;
}

const ProductTable = ({ title, productData, onUpdate }: ProductsTableProps) => {
  const formatCurrency = (amount: number) => {
    if (isNaN(amount)) {
      return "0 VND";
    }
    return amount.toLocaleString("vi-VN") + " VND";
  };

  async function deleteHandle(id: number) {
    const res = await deleteProduct(id);
    alert(res?.message);
    onUpdate();
  }

  return (
    <div className="mt-10 mb-5">
      <div className="mb-4 flex">
        <h3 className="text-2xl font-semibold">{title ? title : "Products"}</h3>
        <div className="ml-auto">
          <ProductDialog title="Create product" onSuccess={onUpdate} />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Catalog</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.catalogName}</TableCell>
              <TableCell>
                <Image
                  width={50}
                  height={50}
                  src={product.imageUrl1}
                  alt={""}
                />
              </TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-5">
                  <ProductDialog
                    title="Edit Product"
                    productData={product}
                    onSuccess={onUpdate} // Callback được truyền từ cha
                  />
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await deleteHandle(product.id);
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

export default ProductTable;
