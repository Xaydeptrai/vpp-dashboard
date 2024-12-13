export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  stock: number;
  catalogId: number;
  catalogName: string;
  isDeleted: boolean;
  createDate: Date;
  updateDate: Date;
}
