import { FC, FormEvent, useState } from "react";
import { Task } from "../../../types/Event";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createSubtaskToTask } from "../../../features/event/eventSlice";
import { selectToken } from "../../../features/auth/authSlice";

type AddSubTaskProps = {
  task: Task;
};

const AddSubTask: FC<AddSubTaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const [subtaskName, setSubtaskName] = useState<string>("");
  const [subtaskDesc, setSubtaskDesc] = useState<string>("");

  const handleAddSubtask = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      createSubtaskToTask({
        taskId: task.id.toString(),
        name: subtaskName,
        desc: subtaskDesc,
        token: token!,
      })
    );

    setSubtaskName("");
    setSubtaskDesc("");
  };

  return (
    <div>
      <p className="font-bold text-xl">Sub-tasks:</p>
      {task.subTasks &&
        task.subTasks.map((subTask) => (
          <div key={subTask.id} className="">
            {subTask.name} - {subTask.desc}
          </div>
        ))}
      <div className="flex mt-2">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered mr-5"
          style={{ maxWidth: "10rem" }}
          value={subtaskName}
          onChange={(e) => setSubtaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Desc"
          className="input input-bordered mr-5"
          style={{ maxWidth: "10rem" }}
          value={subtaskDesc}
          onChange={(e) => setSubtaskDesc(e.target.value)}
        />
        <button className="btn btn-ghost" onClick={handleAddSubtask}>
          Add Subtask
        </button>
      </div>
    </div>
  );
};

export default AddSubTask;
