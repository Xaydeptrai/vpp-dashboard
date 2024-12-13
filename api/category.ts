import { error } from "console";
import { instance } from "./index";

export const fetchCategory = async () => {
  const response = await instance.get("v1/catalogs");
  return response.data;
};

export const createCategory = async (name: string, imageUrl?: string) => {
  const response = await instance.post("v1/catalogs", { name, imageUrl });
  return response.data;
};

export const updateCategory = async (
  id: number,
  name: string,
  imageUrl?: string
) => {
  const response = await instance.put("v1/catalogs/" + id, { name, imageUrl });
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await instance.delete(`v1/catalogs/${id}`);
  return response.data;
};
