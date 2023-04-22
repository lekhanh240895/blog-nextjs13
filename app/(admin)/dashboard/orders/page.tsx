import { getOrders } from "@/app/lib/api";
import { format } from "date-fns";
import { Metadata } from "next";
import { vi } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Orders",
};

export const revalidate = 60;

async function Orders() {
  const orders: Order[] = await getOrders();

  return (
    <section>
      <h2 className="text-3xl uppercase mb-4 md:mr-24">Orders</h2>

      <div className="overflow-x-auto scrollbar-blue">
        <table className="basic table-auto">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Recipent</th>
              <th>Paid</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    {format(new Date(order.createdAt), "MM/dd/yyyy HH:mm", {
                      locale: vi,
                    })}
                  </td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td className="min-w-[200px]">
                    <div className="space-y-2">
                      {order.line_items.map((item, index) => (
                        <div key={index}>
                          <span>{item.quantity} x </span>
                          <span>{item.price_data.product_data.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    {order.paid ? (
                      <span className="text-green-500">Yes</span>
                    ) : (
                      <span className="text-primary">No</span>
                    )}
                  </td>
                  <td className=""></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Orders;
