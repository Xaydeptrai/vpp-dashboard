"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import Link from "next/link";
import { Order } from "@/types/order";
import { Button } from "../ui/button";
import { OrderStatus } from "@/enums/OrderStatus";


interface OrdersTableProps {
    title?: string;
    ordersData: Order[];
}

const OrderTable = ({ title, ordersData }: OrdersTableProps) => {
    // Function to map numeric status to text
    const getStatusLabel = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Pending:
                return "Pending";
            case OrderStatus.Delivered:
                return "Delivered";
            case OrderStatus.Cancelled:
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const formatDate = (dateString: Date): string => {
        const date = new Date(dateString); // Chuyển đổi chuỗi ngày thành đối tượng Date
        const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm số 0 nếu cần
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0) và thêm số 0 nếu cần
        const year = date.getFullYear(); // Lấy năm
        return `${day}-${month}-${year}`; // Trả về định dạng dd-mm-yyyy
    };

    const formatCurrency = (amount: number) => {
        if (isNaN(amount)) {
            return '0 VND';
        }
        return amount.toLocaleString('vi-VN') + ' VND';
    };

    return (
        <div className="mt-10 mb-5">
            <h3 className="text-2xl mb-4 font-semibold">
                {title ? title : "New Orders"}
            </h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tracking Number</TableHead>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Shipping Address</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ordersData.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.trackingNumber}</TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>{formatDate(order.orderDate)}</TableCell>
                            <TableCell>{getStatusLabel(order.orderStatus)}</TableCell>
                            <TableCell className="text-right">
                                {formatCurrency(order.orderTotal)}
                            </TableCell>
                            <TableCell className="text-center">
                                <Link href={`/orders/${order.trackingNumber}`}>
                                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                                        Edit
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default OrderTable;
