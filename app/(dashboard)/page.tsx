import DashboardCard from "@/components/dashboard/DashboardCard";
import { ClipboardCheck, ClipboardList, Newspaper, User } from "lucide-react";
import OrderTable from "@/components/orders/OrderTable"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Today Orders"
          count={10}
          icon={<Newspaper className="text-slate-500" size={48} />}
        />
        <DashboardCard
          title="Completed Orders"
          count={1000}
          icon={<ClipboardCheck className="text-slate-500" size={48} />}
        />
        <DashboardCard
          title="Processing Orders"
          count={120}
          icon={<ClipboardList className="text-slate-500" size={48} />}
        />
        <DashboardCard
          title="Customers"
          count={1000}
          icon={<User className="text-slate-500" size={48} />}
        />
      </div>
      <div className="mt-8">
        <OrderTable title="New Orders" limit={5}/>
      </div>
    </div>
  );
}