import CustomerLayout from "../../layouts/customer/CustomerLayout";

const CustomerSettingsPage = () => {
  return (
    <CustomerLayout>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-700">Settings</h1>
            <div className="flex items-center mt-4 md:mt-0 space-x-3">
              <img
                src="/path-to-profile-image.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-gray-700 text-center md:text-left">
                <span>Harvey Hunat</span>
                <button className="ml-2 text-gray-500 hover:text-gray-700">
                  ▼
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex border-b">
              <button className="px-6 py-2 text-sm font-medium border-b-2 border-black">
                General Setting
              </button>
              <button className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                Subscriptions
              </button>
            </div>
          </div>

          {/* General Settings */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Details */}
            <div className="lg:col-span-2 bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Personal Details
              </h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder=""
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder=""
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder=""
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600 mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder=""
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Right Sidebar */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              {/* Change Password */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Change Password
                </h3>
                <p className="text-sm text-gray-500"></p>
                <button className="mt-3 px-4 py-2 bg-yellow-300 text-gray-800 font-semibold rounded-lg hover:bg-yellow-400">
                  Change Password
                </button>
              </div>
              {/* Delete Account */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-500"></p>
                <button className="mt-3 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </CustomerLayout>
  );
};

export default CustomerSettingsPage;
