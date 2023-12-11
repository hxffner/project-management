import { FC, useEffect } from "react";
import { ProjectResponse } from "../../../features/project/projectService";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getTasksByProjectId,
  selectTasks,
} from "../../../features/event/eventSlice";
import { selectToken } from "../../../features/auth/authSlice";
import TaskBox from "./TaskBox";

type CreateTaskModalProps = {
  project: ProjectResponse;
};

const TaskSection: FC<CreateTaskModalProps> = ({ project }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(getTasksByProjectId({ projectId: project.id, token: token! }));
  }, [dispatch, project.id, token, tasks]);

  return (
    <div>
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
