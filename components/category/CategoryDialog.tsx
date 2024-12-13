"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { createCategory, updateCategory } from "@/api/category";
import { Catalog } from "@/types/catalog";

interface CategoryDialogProps {
  title: string;
  categoryData?: Catalog;
  onSuccess?: () => void;
}

export function CategoryDialog({
  title,
  categoryData,
  onSuccess,
}: CategoryDialogProps) {
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
        <Button>{categoryData ? "Edit" : "Create"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {categoryData
              ? "Make changes here. Click save when you're done."
              : "Create a new Category."}
          </DialogDescription>
        </DialogHeader>
        <ProductForm categoryData={categoryData} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}

interface CategoryFormProps {
  categoryData?: Catalog;
  onSuccess?: () => void;
}

function ProductForm({ categoryData, onSuccess }: CategoryFormProps) {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    categoryData?.imageUrl || null
  );
  const [name, setName] = React.useState(categoryData?.name || "");

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
    let uploadedImageUrl = imageUrl || undefined;

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
      if (categoryData) {
        // Update product
        await updateCategory(categoryData.id, name, uploadedImageUrl);
        alert("Cập nhật danh mục thành công!");
      } else {
        // Create product
        await createCategory(name, uploadedImageUrl);
        alert("Danh mục đã được tạo thành công!");
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error during category submission:", error);
      alert("Lỗi khi xử lý danh mục. Vui lòng thử lại.");
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
      <Button type="submit">
        {categoryData ? "Save changes" : "Create category"}
      </Button>
    </form>
  );
}
