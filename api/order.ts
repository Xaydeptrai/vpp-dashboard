import { instance } from './index';


export const fetchAdminOrders = async (trackingNumber="", orderDate="", sortBy="", pageNumber=1, pageSize=10, orderStatus?: number) => {
    const response = await instance.get('/v1/order/admin-orders', {
        params: {
            trackingNumber,
            orderStatus,
            orderDate,
            sortBy,
            pageNumber,
            pageSize
        },
    });
    return response.data;
};

export const fetchDetailOrders = async (trackingNumber: string) => {
    const response = await instance.get('/v1/order/details/' + trackingNumber);
    return response.data;
};


export const fetchStatistics = async () => {
    const response = await instance.get('/v1/order/statistics', {});
    return response.data;
};

export const updateOrder = async (trackingNumber: string, Address: string, OrderStatus: number) => {
    const response = await instance.put('/v1/order/edit/' + trackingNumber, {
        Address,
        OrderStatus
    })
    return response.data;
}