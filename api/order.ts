import { Account } from '@/types/account';
import { instance } from './index';
import { User } from '@/types/user';


export const fetchAdminOrders = async (trackingNumber="", orderDate="", sortBy="", pageNumber=1, pageSize=10) => {
    const response = await instance.get('/v1/order/admin-orders', {
        params: {
            trackingNumber,
            orderDate,
            sortBy,
            pageNumber,
            pageSize
        },
    });
    return response.data;
};

export const fetchStatistics = async () => {
    const response = await instance.get('/v1/order/statistics', {});
    return response.data;
};