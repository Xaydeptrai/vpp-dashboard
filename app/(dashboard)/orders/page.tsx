import BackButton from "@/components/BackButton";
import OrderTable from "@/components/orders/OrderTable";
import TablePagination from "@/components/TablePagination";

const OrdersPage = () => {
    return ( 
        <>
            <BackButton text="Go Back" link="/" />
            <TablePagination totalPages={10} />
        </> 
    );
}
 
export default OrdersPage;