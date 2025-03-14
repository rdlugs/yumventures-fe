import CustomerLayout from "../../layouts/customer/CustomerLayout";

const CustomerOrder = () => {
  return (
    <CustomerLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 m-10">
        <div className="bg-white border border-gray-100 shadow-md p-6 rounded-md col-span-1">
          <ul className="sm:flex-row w-auto pt-2 text-sm gap-2">
            <div className="flex border shadow-md rounded-lg p-3 mb-4 justify-between items-start cursor-pointer">
              <div>
                <div className="text-[#797575] font-bold text-xl">
                  For Take Out
                </div>
                <div className="text-[#797575] font-medium text-md">
                  Order #123456
                </div>
                <div className="text-[#797575] font-normal text-sm">
                  05-05-2024
                </div>
              </div>

              <div className="bg-yellow-200 text-yellow-600 border border-yellow-200 rounded-3xl px-5 py-2 my-2 mx-2 text-sm font-medium">
                Pending
              </div>
            </div>
          </ul>
        </div>

        <div className="bg-white border border-gray-100 shadow-md p-6 rounded-md col-span-2">
          <div className="flex justify-between items-start">
            <div className="mb-10 text-black font-bold text-xl">
              <div className="">Order #123456</div>
              <div className="">Details</div>
            </div>
            <div className="text-gray-400 font-medium text-sm">05-05-2024</div>
          </div>
          <div className="text-black font-bold text-lg">Notes:</div>
          <div className="pr-64 mb-10">
            Lorem Ipsum dolor sit amet, consectetur abrakadabra
          </div>

          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="inline-block w-auto py-2 align-middle">
                <div className="overflow-hidden md:rounded-lg">
                  <table className="w-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-4 text-sm font-bold text-black">
                          Product Name
                        </th>
                        <th className="py-4 px-4 text-sm font-bold text-black">
                          Quantity
                        </th>
                        <th className="py-4 px-4 text-sm font-bold text-black">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="px-1 tracking-wide py-2">
                          Kambingan Kaldereta
                        </td>
                        <td className="px-56">1</td>
                        <td className="px-1">160.00</td>
                      </tr>
                      <tr>
                        <td className="px-1 tracking-wide py-2">
                          Kambingan Kaldereta
                        </td>
                        <td className="px-56">1</td>
                        <td className="px-1">160.00</td>
                      </tr>
                      <tr>
                        <td className="px-1 tracking-wide py-2">
                          Kambingan Kaldereta
                        </td>
                        <td className="px-56">1</td>
                        <td className="px-1">160.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start font-bold text-black text-xl mt-5">
            <div>Subtotal</div>
            <div>1600.00</div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerOrder;
