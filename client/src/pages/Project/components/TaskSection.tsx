import { FC, useEffect } from "react";
import { ProjectResponse } from "../../../features/project/projectService";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getTasksByProjectId,
  selectTasks,
} from "../../../features/event/eventSlice";
import { selectToken } from "../../../features/auth/authSlice";
import TaskBox from "./TaskBox";
import Notifications from "./Notifications";
import dayjs from "dayjs";

type CreateTaskModalProps = {
  project: ProjectResponse;
};

const TaskSection: FC<CreateTaskModalProps> = ({ project }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const tasks = useAppSelector(selectTasks);

  const currentDate = dayjs();
  const nextDay = currentDate.add(1, "day");

  const filteredTasks = tasks
    .filter((task) => task.status !== "DONE")
    .filter((task) => dayjs(task.endDate).isSame(nextDay, "day"));

  useEffect(() => {
    dispatch(getTasksByProjectId({ projectId: project.id, token: token! }));
  }, [dispatch, project.id, token, tasks]);

  return (
    <div>
      {filteredTasks.length > 0 && (
        <div className="text-xl font-bold text-red-900">Deadlines</div>
      )}
      {filteredTasks.map((task) => (
        <div key={task.id} className="ml-4 my-3 flex">
          <Notifications task={task} />
          <div className="btn bg-base-300">
            Deadline is {dayjs(task.endDate).format("YYYY MM DD")}
          </div>
        </div>
      ))}
      <div className="bg-base-200 p-4 rounded-lg">
        <p className="text-amber-800 font-bold">In Queue</p>
        <ul>
          {tasks
            .filter((task) => task.status === "IN_QUEUE")
            .map((task) => (
              <div key={task.id}>
                <TaskBox task={task} />
              </div>
            ))}
        </ul>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="bg-base-200 p-4 rounded-lg flex-1">
          <p className="text-yellow-500 font-bold">In Progress</p>
          <ul>
            {tasks
              .filter((task) => task.status === "IN_PROGRESS")
              .map((task) => (
                <div key={task.id}>
                  <TaskBox task={task} />
                </div>
              ))}
          </ul>
        </div>

        {/* <div className="bg-base-200 p-4 rounded-lg flex-1">
          <p className="text-red-500 font-bold">On Hold</p>
          <ul>
            {tasks
              .filter((task) => task.status === "ON_HOLD")
              .map((task) => (
                <div key={task.id}>
                  <TaskBox task={task} />
                </div>
              ))}
          </ul>
        </div> */}

        <div className="bg-base-200 p-4 rounded-lg flex-1">
          <p className="text-green-500 font-bold">Done</p>
          <ul>
            {tasks
              .filter((task) => task.status === "DONE")
              .map((task) => (
                <div key={task.id}>
                  <TaskBox task={task} />
                </div>
              ))}
          </ul>
        </div>
      </div>
      <div className="bg-base-200 p-4 rounded-lg flex-1 mt-4">
        <p className="text-red-500 font-bold">On Hold</p>
        <ul>
          {tasks
            .filter((task) => task.status === "ON_HOLD")
            .map((task) => (
              <div key={task.id}>
                <TaskBox task={task} />
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskSection;
