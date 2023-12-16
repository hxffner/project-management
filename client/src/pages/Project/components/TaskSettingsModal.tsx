import { FC, FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectToken } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { deleteTask, updateTask } from "../../../features/event/eventSlice";
import { Task } from "../../../types/Event";

type TaskSettingsModalProps = {
  task: Task;
};

const TaskSettingsModal: FC<TaskSettingsModalProps> = ({ task }) => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const name = useRef<HTMLInputElement | null>(null);
  const desc = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nameValue = name.current?.value;
    const descValue = desc.current?.value;

    if (!nameValue || !descValue) {
      toast.error("Fill in every detail!");
      return;
    }

    if (nameValue === undefined || descValue === undefined) {
      toast.error("Fill in every detail!");
      return;
    }

    const updatedTask = {
      ...task,
      name: nameValue,
      description: descValue,
    };

    dispatch(updateTask({ task: updatedTask, token: token! }));


  };

  const handleDeleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) {
      console.error("Token is null. Unable to delete project.");
      return;
    }

    try {
      await dispatch(deleteTask({ taskId: task.id, token }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }

    toast.success("Task successfully deleted!");
  };

  return (
    <div>
      <dialog id="task_settings_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <h1 className="font-bold text-xl">Task Settings</h1>
              <input
                type="text"
                placeholder={task.name}
                defaultValue={task.name}
                className="input input-bordered w-full max-w-xs"
                ref={name}
              />
              <input
                type="text"
                placeholder={task.description}
                defaultValue={task.description}
                className="input input-bordered w-full max-w-xs"
                ref={desc}
              />
              <button type="submit" className="btn btn-block max-w-xs">
                Save
              </button>
              <button
                className="btn btn-block btn-error max-w-xs"
                onClick={handleDeleteTask}
              >
                Delete Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TaskSettingsModal;
