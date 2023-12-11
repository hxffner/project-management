import { FC, FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectToken } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { createTask } from "../../../features/event/eventSlice";
import dayjs from "dayjs";
import { ProjectResponse } from "../../../features/project/projectService";

type CreateTaskModalProps = {
  project: ProjectResponse;
};

const CreateTaskModal: FC<CreateTaskModalProps> = ({ project }) => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const name = useRef<HTMLInputElement | null>(null);
  const desc = useRef<HTMLInputElement | null>(null);
  const startDate = useRef<HTMLInputElement | null>(null);
  const endDate = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nameValue = name.current?.value;
    const descValue = desc.current?.value;
    const startDateValue = startDate.current?.value;
    const endDateValue = endDate.current?.value;

    if (!nameValue || !descValue || !startDate || !endDate) {
      toast.error("Fill in every detail!");
      return;
    }

    const startDateObject = dayjs(startDateValue).format("YYYY-MM-DD HH:mm:ss");
    const endDateObject = dayjs(endDateValue).format("YYYY-MM-DD HH:mm:ss");

    try {
      await dispatch(
        createTask({
          project: project,
          name: nameValue,
          description: descValue,
          startDate: startDateObject,
          endDate: endDateObject,
          token: token!,
        })
      );
      toast.success("Event creation successful!");
    } catch (error) {
      toast.error("Wrong details!");
      console.error("Event failed:", error);
    }
  };

  return (
    <div>
      <dialog id="add_task_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <h1 className="font-bold text-xl">Create Task Form</h1>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
                ref={name}
              />
              <input
                type="text"
                placeholder="Desc"
                className="input input-bordered w-full max-w-xs"
                ref={desc}
              />
              <div className="flex gap-8">
                <div>
                  <h1 className="font-bold text-lg">Start Date</h1>
                  <input type="date" ref={startDate} />
                </div>
                <div>
                  <h1 className="font-bold text-lg">End Date</h1>
                  <input type="date" ref={endDate} />
                </div>
              </div>

              <button type="submit" className="btn btn-block max-w-xs">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreateTaskModal;
