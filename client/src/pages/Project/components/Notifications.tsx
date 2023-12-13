import { FC } from "react";
import { Task } from "../../../types/Event";
import TaskInformationModal from "./TaskInformationModal";

type TaskBoxProps = {
  task: Task;
};

const Notifications: FC<TaskBoxProps> = ({ task }) => {
  return (
    <div>
      <div className="flex">
        <button
          className="btn bg-base-300 mr-2"
          onClick={() => {
            (
              document!.getElementById(
                "task_information_modal"
              ) as HTMLFormElement
            ).showModal();
          }}
        >
          {task.name}
        </button>
        <TaskInformationModal task={task} />
      </div>
    </div>
  );
};

export default Notifications;
