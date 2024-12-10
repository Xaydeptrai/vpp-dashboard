import { Order } from "@/types/order";

const orders: Order[] = [
    {
        id: "1",
        trackingNumber: "TRK123456",
        name: "John Doe",
        address: "123 Main St, Cityville, USA",
        orderDate: new Date("2024-12-01"),
        shippingDate: new Date("2024-12-05"),
        orderStatus: 1, // 1: Shipped
        paymentMethod: 2, // 2: Credit Card
        paymentStatus: 1, // 1: Paid
        total: 100000
    },
    {
        id: "2",
        trackingNumber: "TRK789101",
        name: "Jane Smith",
        address: "456 Oak Ave, Townsville, USA",
        orderDate: new Date("2024-12-03"),
        shippingDate: new Date("2024-12-07"),
        orderStatus: 0, // 0: Pending
        paymentMethod: 1, // 1: PayPal
        paymentStatus: 0, // 0: Unpaid
        total: 100000
    },
    {
        id: "3",
        trackingNumber: "TRK112233",
        name: "Alice Brown",
        address: "789 Pine Rd, Villageville, USA",
        orderDate: new Date("2024-12-02"),
        shippingDate: new Date("2024-12-06"),
        orderStatus: 2, // 2: Delivered
        paymentMethod: 3, // 3: Bank Transfer
        paymentStatus: 1, // 1: Paid
        total: 100000
    }
];

export default orders