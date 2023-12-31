import { FC, FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectToken } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { createProject } from "../../../features/project/projectSlice";

const CreateModal: FC = () => {
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

    try {
      await dispatch(
        createProject({
          name: nameValue,
          description: descValue,
          token: token!,
        })
      );
      toast.success("Project creation successful!");
    } catch (error) {
      toast.error("Wrong details!");
      console.error("Project failed:", error);
    }
  };

  return (
    <div>
      <dialog id="create_project_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <h1 className="font-bold text-xl">Create Project Form</h1>
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
              <button type="submit" className="btn btn-block max-w-xs">
                Create Project
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreateModal;
