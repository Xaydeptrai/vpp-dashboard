import { instance } from ".";

interface searchParams {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  pageNumber?: number;
  pageSize?: number;
  catalogId?: number;
}

export const fetchProduct = async ({
  name,
  minPrice,
  maxPrice,
  pageNumber,
  pageSize = 8,
  catalogId,
}: searchParams) => {
  const response = await instance.get("/v1/products/", {
    params: {
      name,
      minPrice,
      maxPrice,
      pageNumber,
      pageSize,
      catalogId,
    },
  });
  return response.data;
};

export const updateProduct = async ({
  id,
  name,
  description,
  price,
  imageUrl1,
  stock,
}: {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl1: string | null;
  stock: number;
}) => {
  const response = await instance.put("/v1/products/" + id.toString(), {
    name,
    description,
    price,
    imageUrl1,
    stock,
  });
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await instance.delete("/v1/products/" + id.toString());
  return response.data;
};
