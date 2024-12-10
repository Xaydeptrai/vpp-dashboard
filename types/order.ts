export interface Order {
    id: string;
    trackingNumber: string;
    name: string;
    address: string;
    orderDate: Date;
    shippingDate: Date;
    orderStatus: number;
    paymentMethod: number;
    paymentStatus: number;
    orderTotal: number;
}