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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { uploadImageToCloudinary } from "@/api/cloudinary";
import { createProduct, updateProduct } from "@/api/product";
import { fetchCategory } from "@/api/category";
import { Catalog } from "@/types/catalog";
import { Product } from "@/types/product";

interface ProductDialogProps {
  title: string;
  productData?: Product;
  onSuccess?: () => void;
}

export function ProductDialog({
  title,
  productData,
  onSuccess,
}: ProductDialogProps) {
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
        <Button>{productData ? "Edit" : "Create"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {productData
              ? "Make changes here. Click save when you're done."
              : "Create a new product."}
          </DialogDescription>
        </DialogHeader>
        <ProductForm productData={productData} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}

interface ProductFormProps {
  productData?: Product;
  onSuccess?: () => void;
}

function ProductForm({ productData, onSuccess }: ProductFormProps) {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(
    productData?.imageUrl1 || null
  );
  const [name, setName] = React.useState(productData?.name || "");
  const [description, setDescription] = React.useState(
    productData?.description || ""
  );
  const [price, setPrice] = React.useState(productData?.price || 0);
  const [stock, setStock] = React.useState(productData?.stock || 0);
  const [catalogId, setCatalogId] = React.useState(productData?.catalogId || 0);
  const [catalogs, setCatalogs] = React.useState<Catalog[]>([]);

  React.useEffect(() => {
    const getCatalogs = async () => {
      try {
        const response = await fetchCategory();
        setCatalogs(response.result);
      } catch (error) {
        console.error("Failed to fetch catalogs", error);
      }
    };
    getCatalogs();
  }, []);

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
      if (productData) {
        // Update product
        await updateProduct({
          id: productData.id,
          name,
          description,
          price,
          stock,
          catalogId,
          imageUrl1:
            uploadedImageUrl ||
            "https://res.cloudinary.com/djqs6ttza/image/upload/v1734093153/xvo11a2zcdgoxxrxxzsj.webp",
        });
        alert("Cập nhật sản phẩm thành công!");
      } else {
        // Create product
        await createProduct(
          name,
          description,
          price,
          stock,
          catalogId,
          uploadedImageUrl
        );
        alert("Sản phẩm đã được tạo thành công!");
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error during product submission:", error);
      alert("Lỗi khi xử lý sản phẩm. Vui lòng thử lại.");
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
      <div className="grid gap-2 mb-2">
        <Label htmlFor="catalog">Catalog</Label>
        <Select
          onValueChange={(value) => setCatalogId(Number(value))}
          value={String(catalogId)}
        >
          <SelectTrigger id="catalog">
            <SelectValue placeholder="Select Catalog" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Select Catalog</SelectItem>
            {catalogs.map((catalog) => (
              <SelectItem key={catalog.id} value={String(catalog.id)}>
                {catalog.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">
        {productData ? "Save changes" : "Create Product"}
      </Button>
    </form>
  );
}
