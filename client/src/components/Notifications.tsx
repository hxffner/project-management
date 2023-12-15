import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectToken, selectUser } from "../features/auth/authSlice";
import NotificationContent from "./NotificationContent";
import { getTaskByUserId, selectTasks } from "../features/event/eventSlice";

const Notifications: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    if (token !== null && user?.userId !== null) {
      dispatch(getTaskByUserId({ userId: user!.userId, token }));
    }
  }, [dispatch, token, user]);

  return (
    <div className="collapse">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        Notifications
      </div>
      <div className="collapse-content">
        {tasks &&
          tasks.map((task, i) => <NotificationContent key={i} task={task} />)}
      </div>
    </div>
  );
};

export default Notifications;
