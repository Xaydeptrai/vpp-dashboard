"use client"
import DashboardCard from "@/components/dashboard/DashboardCard";
import { ClipboardCheck, ClipboardList, Newspaper, User } from "lucide-react";
import OrderTable from "@/components/orders/OrderTable";
import { fetchAdminOrders, fetchStatistics } from "@/api/order"; // Thêm import fetchStatistics
import { useEffect, useState } from "react"; // Thêm useEffect và useState

export default function Home() {
    const [statistics, setStatistics] = useState({
        totalOrdersToday: 0,
        completedOrders: 0,
        pendingOrders: 0,
        totalCsutomer: 0,
    });

    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
      const loadStatistics = async () => {
          const data = await fetchStatistics(); // Gọi API để lấy thống kê
          if (data.isSuccess) {
              setStatistics(data.result); // Cập nhật state với dữ liệu thống kê
          }
      };

      const loadOrders = async () => {
          const orders = await fetchAdminOrders("","","",1,5); // Gọi API để lấy đơn hàng
          setOrdersData(orders.result.items); // Cập nhật state với dữ liệu đơn hàng
      };

      loadStatistics();
      loadOrders();
  }, []); // Chạy một lần khi component được mount

    return (
        <div className="container mx-auto px-4">
            <div className="my-6 text-4xl font-bold">
              Dashboard
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title="Today Orders"
                    count={statistics.totalOrdersToday}
                    icon={<Newspaper className="text-slate-500" size={48} />}
                />
                <DashboardCard
                    title="Completed Orders"
                    count={statistics.completedOrders}
                    icon={<ClipboardCheck className="text-slate-500" size={48} />}
                />
                <DashboardCard
                    title="Pending Orders"
                    count={statistics.pendingOrders}
                    icon={<ClipboardList className="text-slate-500" size={48} />}
                />
                <DashboardCard
                    title="Customers"
                    count={statistics.totalCsutomer}
                    icon={<User className="text-slate-500" size={48} />}
                />
            </div>
            <div className="mt-8">
              <OrderTable title="New Orders" ordersData={ordersData} />
            </div>
        </div>
    );
}