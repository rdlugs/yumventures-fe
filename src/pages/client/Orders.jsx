import { useState, useEffect } from "react";
import axios from "axios";
import ClientLayout from "../../layouts/client/ClientLayout";
import { useNavigate } from "react-router-dom";
import { ConciergeBell, ListTodo, ShoppingBag } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";

const ClientOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [filteredOrders, setFilteredOrders] = useState([]); // State to store filtered orders
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all"); // State to store selected filter (All, Preparing, etc.)

  // Fetch all orders with items
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pos/orders", {
          withCredentials: true, // Automatically send cookies with the request
        });
        setOrders(response.data);
        setFilteredOrders(response.data); // Initially, show all orders
        console.log("Orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login...");
          navigate("/client/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change for an order
  const changeOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:3000/pos/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        {
          withCredentials: true, // Automatically send cookies with the request
        }
      );
      // Update the order status locally after the update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      // Update filtered orders based on new status
      if (statusFilter === "all" || newStatus === statusFilter) {
        setFilteredOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  // Filter orders by status
  const filterOrdersByStatus = (status) => {
    setStatusFilter(status);
    if (status === "all") {
      setFilteredOrders(orders); // Show all orders
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status)); // Filter by selected status
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <ClientLayout>
      <div>
        <h2>Orders Page</h2>

        {/* Filter buttons for statuses */}
        <div className="flex flex-row justify-start gap-4 p-2">
          <button
            onClick={() => filterOrdersByStatus("all")}
            className={`py-2 px-4 text-sm font-medium rounded-lg focus:outline-none transition-all duration-200 ${
              statusFilter === "all"
                ? "bg-blue-600 text-white border border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => filterOrdersByStatus("preparing")}
            className={`py-2 px-4 text-sm font-medium rounded-lg focus:outline-none transition-all duration-200 ${
              statusFilter === "preparing"
                ? "bg-blue-600 text-white border border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            }`}
          >
            Preparing
          </button>
          <button
            onClick={() => filterOrdersByStatus("ready to pickup")}
            className={`py-2 px-4 text-sm font-medium rounded-lg focus:outline-none transition-all duration-200 ${
              statusFilter === "ready to pickup"
                ? "bg-blue-600 text-white border border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            }`}
          >
            Ready to Pickup
          </button>
          <button
            onClick={() => filterOrdersByStatus("completed")}
            className={`py-2 px-4 text-sm font-medium rounded-lg focus:outline-none transition-all duration-200 ${
              statusFilter === "completed"
                ? "bg-blue-600 text-white border border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            }`}
          >
            Completed
          </button>
        </div>

        <div className="orders-container grid grid-cols-3 gap-2 p-2">
          {filteredOrders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
              >
                <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                  <div className="flex flex-row justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        Order # {order.id}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>

                  <div className="flex items-center gap-x-1">
                    <div className="hs-tooltip inline-block">
                      {order.status === "preparing" && (
                        <button
                          onClick={() =>
                            changeOrderStatus(order.id, "ready to pickup")
                          }
                          type="button"
                          className="group size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
                        >
                          <ConciergeBell className="shrink-0 size-4" />
                          <span className=" group-hover:opacity-100  opacity-0 transition-opacity inline-block absolute mt-20  z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700">
                            Notify that order is ready
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="hs-tooltip inline-block">
                      {order.status === "ready to pickup" && (
                        <button
                          onClick={() =>
                            changeOrderStatus(order.id, "completed")
                          }
                          type="button"
                          className="group size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
                        >
                          <ListTodo className="shrink-0 size-4" />
                          <span className="group-hover:opacity-100  opacity-0 transition-opacity inline-block absolute mt-20  z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700">
                            Completed
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-5">
                  <ul>
                    {order.items.map((item, index) => (
                      <li
                        className="mt-2 text-gray-500 dark:text-neutral-400"
                        key={index}
                      >
                        {item.quantity} {item.menu_item_name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientOrders;
