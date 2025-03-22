import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bell } from "lucide-react"; // Using lucide for bell icon
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import useAuthStore from "@/store/client/useAuthStore"
import { formatDistanceToNow } from "date-fns";
import useNotificationStore from '@/store/client/useNotificationStore';

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  withCredentials: true
});

export default function Notifications() {

  const { me } = useAuthStore();
  const { updateNotification } = useNotificationStore();
  const [authUser, setAuthUser] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notification, setNotification] = useState('');
  const [notificationLoading, setNotificationLoading] = useState(true);

  useEffect(() => {
   
    let getAuthUser = async () => {
      let user = await me();
      setAuthUser(user);
    }

    getAuthUser();
  }, []);

  useEffect(() => {
    if (authUser) {
      socket.emit("user_connected", authUser);
    }
  }, [authUser]);

  useEffect(() => {
    socket.on('notification', (data) => {
      if(data?.notifications) {
        let notifCount = 0;
        let notifications = data?.notifications.map((item) => {
          let item_data = JSON.parse(item.data);
          
          if(!item.is_seen) {
            notifCount++;
          }

          return {
            ...item,
            ...item_data,
            ingredient_name: item_data?.data?.ingredient_name,
            batch_number: item_data?.data?.batch_number
          }
        });

        setNotificationCount(notifCount)
        setNotification(notifications);
      }
    });

    socket.on('done_loading', (data) => {
      setNotificationLoading(false);
    });
  }, [])

  const updateNotif = async () => {
    if(!notificationCount) {
      return false;
    }

    await updateNotification(authUser?.businessId);
    setNotificationCount(0);
  }

  return (
    <div className="relative inline-block">
      <Popover>
        <PopoverButton
          onClick={updateNotif}
          type="button"
          className="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          {notificationCount ? (
            <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              { notificationCount }
            </span>
          ) : ''}

          <Bell className="shrink-0 size-4" />
          <span className="sr-only">Notifications</span>
        </PopoverButton>

        <PopoverPanel className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:bg-neutral-800 dark:divide-neutral-700">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              Notifications
            </h3>
          </div>

          <div className="max-h-48 overflow-y-auto p-2">
            {/* Sample Notifications */}
            <div className="space-y-2">
              { notificationLoading ? (
                <p className="text-sm text-gray-800 dark:text-neutral-400 text-center">
                  Loading...
                </p>
              ) : 
                notification.length === 0 ? (
                  <p className="text-sm text-gray-800 dark:text-neutral-400 text-center">
                    Empty Notifications!
                  </p>
                ) : 
                  notification.map((notif, index) => (
                    <a
                      href="javascript:void(0)"
                      className={`block rounded-lg py-2 px-3 hover:bg-gray-100 dark:hover:bg-neutral-700 transition`}
                      key={`notif-${index}`}
                    >
                      <p className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                        { !notif.is_seen ? (
                          <svg width="5px" height="5px" viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <g id="color">
                                <circle cx="36" cy="36.0001" r="28" fill="#d22f27"></circle>
                              </g>
                              <g id="line">
                                <circle cx="36" cy="36.0001" r="28" fill="none" stroke="#d22f27" stroke-linejoin="round" stroke-width="2"></circle>
                              </g>
                            </g>
                          </svg>
                        ) : '' }
                        <span className={`${!notif.is_seen ? 'pl-1' : ''}`}>{notif.title}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-neutral-500">
                        {`${notif.ingredient_name} | ${notif.batch_number}`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-neutral-500">
                        {formatDistanceToNow(notif.created_at, { addSuffix: true })}
                      </p>
                    </a>
                  ))
              }

            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
