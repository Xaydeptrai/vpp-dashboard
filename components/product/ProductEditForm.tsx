"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { uploadImageToCloudinary } from "@/api/cloudinary";
import { updateProduct } from "@/api/product";

interface ProductEditFormProbs {
  title?: string;
  productData: Product;
}

export function EditProductDialog({
  title,
  productData,
  onSuccess,
}: ProductEditFormProbs & { onSuccess?: () => void }) {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ProductEditForm productData={productData} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}

function ProductEditForm({
  productData,
  onSuccess,
}: ProductEditFormProbs & { onSuccess?: () => void }) {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    productData.imageUrl1 || null
  );
  const [name, setName] = React.useState(productData.name);
  const [description, setDescription] = React.useState(productData.description);
  const [price, setPrice] = React.useState(productData.price);
  const [stock, setStock] = React.useState(productData.stock);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let uploadedImageUrl = imageUrl || null;

    if (imageFile) {
      try {
        uploadedImageUrl = await uploadImageToCloudinary(imageFile);
      } catch (error) {
        console.error("Error during image upload:", error);
        alert("Lỗi khi tải ảnh lên. Vui lòng thử lại.");
        return;
      }
    }

    try {
      const updatedProduct = await updateProduct({
        id: productData.id,
        name,
        description,
        price,
        imageUrl1: uploadedImageUrl,
        stock,
      });
      console.log("Product updated successfully", updatedProduct);
      alert("Cập nhật sản phẩm thành công!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error during product update:", error);
      alert("Lỗi khi cập nhật sản phẩm. Vui lòng thử lại.");
    }
  };

  return (
    <form className="grid items-start gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label>Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label>Image</Label>
        <div className="flex gap-8 items-center">
          <Input
            className="w-2/3"
            type="file"
            id="image"
            onChange={handleImageChange}
          />
          {imageUrl && (
            <div>
              <Image
                src={imageUrl}
                alt="Image preview"
                width={80}
                height={80}
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <Label>Stock</Label>
        <Input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />
      </div>
      <div className="grid gap-2">
        <Label>Price</Label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
