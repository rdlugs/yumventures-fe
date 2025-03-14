import CustomerLayout from "../../layouts/customer/CustomerLayout";
import {
  ImagePlus,
  Star,
  EllipsisVertical,
  Heart,
  MessageCircleMore,
  Send,
  Paperclip,
} from "lucide-react";

const Customertocustomer = () => {
  return (
    <CustomerLayout>
      <div className="min-h-full bg-gray-50 flex items-center justify-center py-2">
        <div className="container mx-auto px-4 max-w-screen-md">
          {/* Text Area */}
          <div className="mb-6">
            <div className="relative">
              <textarea
                className="p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="Share your yum moments..."
              ></textarea>

              <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-gray-100 focus:z-10 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <Paperclip className="shrink-0 size-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-x-1">
                    <button
                      type="button"
                      className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500"
                    >
                      <Send className="shrink-0 size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Post Card */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {/* User Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 text-sm font-medium">Naruto</p>
                    <p className="text-gray-500 text-xs">Posted 2 hours ago</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <EllipsisVertical />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 mb-4">May ipis yung soup ko!!</p>
              <img
                src="https://via.placeholder.com/200x200"
                alt="Post Image"
                className=" w-full h-full object-cover rounded-lg mb-4"
              />

              {/* Actions */}
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <button className="flex items-center space-x-2 hover:text-gray-700">
                  <Heart />
                  <span>69 Likes</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-gray-700">
                  <MessageCircleMore />
                  <span>3 Comments</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Customertocustomer;
