"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OrderDetail } from "@/types/orderDetail";
import Image from "next/image";

interface OrderDetailProps {
  orderDetailData: OrderDetail[];
}

const OrderProductTable = ({ orderDetailData }: OrderDetailProps) => {
  const formatCurrency = (amount: number) => {
    if (isNaN(amount)) {
      return "0 VND";
    }
    return amount.toLocaleString("vi-VN") + " VND";
  };

  const totalAmount = orderDetailData.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="mt-10 mb-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetailData.map((product, index) => (
            <TableRow className="text-lg" key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Image
                  alt=""
                  src={product.imageUrl}
                  width={80}
                  height={80}
                ></Image>
              </TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right text-xl font-semibold">
              {formatCurrency(totalAmount)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderProductTable;
