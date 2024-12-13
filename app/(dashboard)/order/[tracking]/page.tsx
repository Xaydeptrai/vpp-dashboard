"use client";
import { fetchDetailOrders, updateOrder } from "@/api/order";
import BackButton from "@/components/BackButton";
import { EnumCombobox } from "@/components/EnumCombobox";
import OrderProductTable from "@/components/order/OrderProductTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderStatus } from "@/enums/OrderStatus";
import { Order } from "@/types/order";
import { useState, useEffect, ChangeEvent } from "react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ tracking: string }>;
}) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    null
  );
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [orderData, setOrdersDate] = useState<Order | null>();
  const [orderDetail, setOrderDetail] = useState([]);
  const [address, setAddress] = useState<string>("");

  const loadOrderDetail = async (tracking: string) => {
    try {
      const order = await fetchDetailOrders(tracking);
      setOrdersDate(order.result);
      setOrderDetail(order.result.orderDetails);
      setSelectedStatus(order.result.orderStatus);
      setAddress(order.result.address);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const saveOrderStatus = async () => {
    try {
      await updateOrder(trackingNumber!, address!, selectedStatus!);
      alert("Order updated successfully!");
      loadOrderDetail(trackingNumber!);
    } catch (error) {
      alert("Failed to update order!");
      console.error("Failed to update order status:", error);
    }
  };

  // Xử lý params async
  useEffect(() => {
    async function fetchTracking() {
      const resolvedParams = await params;
      setTrackingNumber(resolvedParams.tracking);
      await loadOrderDetail(resolvedParams.tracking); // Chuyển tracking vào đây
    }
    fetchTracking();
  }, [params]);

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString); // Chuyển đổi chuỗi ngày thành đối tượng Date
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm số 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0) và thêm số 0 nếu cần
    const year = date.getFullYear(); // Lấy năm
    return `${day}-${month}-${year}`; // Trả về định dạng dd-mm-yyyy
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setAddress(event.target.value);
  }

  return (
    <div>
      <div className="max-w-[100px] items-center">
        <BackButton text="Go Back" link="/order" />
      </div>
      <div className="my-5">
        <div className="text-2xl font-semibold">
          ORDER: {trackingNumber || "Loading..."}
        </div>
        <div className="font-semibold mt-1">
          Date: {orderData ? formatDate(orderData.orderDate) : "Loading..."}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="text-xl mr-2">Address</div>
        <div className="text-xl mr-10">
          <Input
            type="text"
            onChange={handleChange}
            className="min-w-96"
            value={address}
          ></Input>
        </div>
        <div className="text-xl">Status</div>
        <EnumCombobox
          enumObject={OrderStatus}
          selectedValue={selectedStatus}
          onSelect={setSelectedStatus}
          placeholder="Pending"
        />
        <div className="ml-auto">
          <Button onClick={saveOrderStatus}>Save</Button>
        </div>
      </div>
      <div className="">
        <OrderProductTable orderDetailData={orderDetail} />
      </div>
    </div>
  );
}
