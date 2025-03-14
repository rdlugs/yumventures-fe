import CustomerLayout from "../../layouts/customer/CustomerLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const Browse = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async;
  });
  return (
    <CustomerLayout>
      <div className="max-w-full px-4 py-10 sm:px-4 lg:px-4 lg:py-4 mx-auto">
        <h3 className="text-xl font-bold pb-5">Shop by categories</h3>
        {/* Grid */}
        <div className="grid sm:grid-cols-12 row-span-2 gap-6">
          {/* Card 1 */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 hover:scale-105 transform transition duration-150">
            <a
              href=""
              className="group relative block rounded-xl focus:outline-none"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:rounded-xl before:from-gray-900/70">
                <img
                  src="https://images.unsplash.com/photo-1669828230990-9b8583a877ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt=""
                  className="rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Kambingan
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>
          </div>

          {/* Card 2 */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 grid grid-rows-2 gap-6">
            {/* Top Image */}
            <a
              href=""
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
            >
              <div className="aspect-w-12 aspect-h-7 rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
                <img
                  src="https://www.southernliving.com/thmb/UfsmR5OQyqgZSf3qiNs0ZiL2Jts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mamas-fried-chicken_audit1819_beauty_197-9d9a60dbcede4c7984c6d670fba69e08.jpg"
                  alt=""
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Tapa
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>

            {/* Bottom Image */}
            <a
              href=""
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
            >
              <div className="aspect-w-12 aspect-h-7 rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
                <img
                  src="https://www.southernliving.com/thmb/UfsmR5OQyqgZSf3qiNs0ZiL2Jts=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mamas-fried-chicken_audit1819_beauty_197-9d9a60dbcede4c7984c6d670fba69e08.jpg"
                  alt=""
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Chicken
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>
          </div>

          {/* Card 1 */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <a
              href=""
              className="group relative block rounded-xl focus:outline-none hover:scale-105 transform transition duration-150"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:rounded-xl before:from-gray-900/70">
                <img
                  src="https://images.unsplash.com/photo-1669828230990-9b8583a877ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt=""
                  className="rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Beef
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>
          </div>

          {/* Card 2 */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 grid grid-rows-2 gap-6">
            {/* Top Image */}
            <a
              href=""
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
            >
              <div className="aspect-w-12 aspect-h-7 rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
                <img
                  src="https://5e10b442.rocketcdn.me/wp-content/uploads/2024/05/LPK_News_Articles_Great-Functional-Beverage-Boom-CLAIRE-KEYS-PYTLIK.webp"
                  alt=""
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Beverage
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>

            {/* Bottom Image */}
            <a
              href=""
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
            >
              <div className="aspect-w-12 aspect-h-7 rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
                <img
                  src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt=""
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Kambingan
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>
          </div>

          {/* Card 1 */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <a
              href=""
              className="group relative block rounded-xl focus:outline-none hover:scale-105 transform transition duration-150"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:rounded-xl before:from-gray-900/70">
                <img
                  src="https://images.unsplash.com/photo-1669828230990-9b8583a877ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt=""
                  className="rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Kambingan
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>
          </div>

          {/* Card 2 */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 grid grid-rows-2 gap-6">
            {/* Top Image */}
            <a
              href=""
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
            >
              <div className="aspect-w-12 aspect-h-7 rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
                <img
                  src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt=""
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Kambingan
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>

            {/* Bottom Image */}
            <a
              href=""
              className="group relative block rounded-xl overflow-hidden focus:outline-none"
            >
              <div className="aspect-w-12 aspect-h-7 rounded-xl overflow-hidden before:absolute before:inset-x-0 before:z-[1] before:size-full before:bg-gradient-to-t before:from-gray-900/70">
                <img
                  src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt=""
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 inset-x-0 z-10">
                <div className="flex flex-col h-full p-4 sm:p-6">
                  <h3 className="text-lg sm:text-3xl font-semibold text-white group-hover:text-white/80 group-focus:text-white/80">
                    Kambingan
                  </h3>
                  <p className="mt-2 text-white/80">Shop Now</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Browse;
