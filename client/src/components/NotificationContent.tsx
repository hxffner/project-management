import { FC } from "react";
import { Task } from "../types/Event";
import dayjs from "dayjs";

type NotificationContentProps = {
  task: Task;
};

const NotificationContent: FC<NotificationContentProps> = ({ task }) => {
  const currentDate = dayjs();
  const nextDay = currentDate.add(1, "day");

  // Parse task.endDate using dayjs
  const taskEndDate = dayjs(task.endDate);

  // Check if task.endDate is the next day and task.status is not "DONE"
  const shouldShowTask =
    taskEndDate.isSame(nextDay, "day") && task.status !== "DONE";

  return (
    <div>
      {shouldShowTask && (
        <div>
          Task <span className="font-bold">{task.name}</span> in project <span className="font-bold">{task.project.name}</span> is due tomorrow.
        </div>
      )}
    </div>
  );
};

export default NotificationContent;
