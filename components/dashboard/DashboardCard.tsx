import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
  titleColor?: string;
}

const DashboardCard = ({ title, count, icon }: DashboardCardProps) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-800 px-4 pt-4 flex flex-col items-center justify-center shadow-md rounded-lg">
      <CardContent className="text-center">
        <h3 className="text-lg md:text-xl font-bold text-slate-500 dark:text-slate-200">
          {title}
        </h3>
        <div className="flex flex-col items-center gap-2 mt-3">
          {icon}
          <h3 className="text-3xl md:text-4xl font-semibold text-slate-500 dark:text-slate-200">
            {count}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
