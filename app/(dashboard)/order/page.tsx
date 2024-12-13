"use client";

import { fetchAdminOrders } from "@/api/order";
import BackButton from "@/components/BackButton";
import { EnumCombobox } from "@/components/EnumCombobox";
import OrderTable from "@/components/order/OrderTable";
import TablePagination from "@/components/TablePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderStatusForSearch } from "@/enums/OrderStatus";
import { ChangeEvent, useEffect, useState } from "react";

const OrdersPage = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatusForSearch | null>(null);
  const [TrackingNumber, setTrackingNumber] = useState<string>("");

  const loadOrders = async (
    page: number,
    trackingNumber?: string,
    orderStatus?: number
  ) => {
    setLoading(true);
    try {
      const orders = await fetchAdminOrders(
        trackingNumber,
        "",
        "",
        page,
        10,
        orderStatus
      );
      setOrdersData(orders.result.items);
      setTotalPage(orders.result.totalPages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders(currentPage);
  }, [currentPage]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTrackingNumber(event.target.value);
  }

  return (
    <>
      <div className="max-w-[100px] items-center">
        <BackButton text="Go Back" link="/" />
      </div>
      <div className="my-3 flex flex-row gap-5">
        <div className="w-1/5">
          <Input
            type="text"
            width={100}
            placeholder="Tracking number"
            onChange={handleChange}
          />
        </div>
        <div>
          <EnumCombobox
            enumObject={OrderStatusForSearch}
            selectedValue={selectedStatus}
            onSelect={setSelectedStatus}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              const status =
                selectedStatus !== null ? selectedStatus - 1 : undefined;
              if (status != -1) {
                loadOrders(1, TrackingNumber, status);
              } else {
                loadOrders(1, TrackingNumber);
              }
            }}
          >
            Seach
          </Button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <OrderTable title="Orders" ordersData={ordersData} />
      )}
      <TablePagination
        totalPages={totalPage}
        onPageChange={(page) => setcurrentPage(page)}
      />
    </>
  );
};

export default OrdersPage;
