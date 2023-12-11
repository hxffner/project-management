import { FC } from "react";
import { Task } from "../../../types/Event";

type TaskInformationModalProps = {
  task: Task;
};

const TaskInformationModal: FC<TaskInformationModalProps> = ({ task }) => {
  return (
    <div>
      <dialog id="task_information_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex flex-col gap-6 items-center">
            <h1 className="font-bold text-xl">Task Information</h1>
          </div>
          <div>
            <p>Name: {task.name}</p>
            <p>Description: {task.description}</p>
            <p>Start Date: {task.startDate.toString()}</p>
            <p>End Date: {task.endDate.toString()}</p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TaskInformationModal;
