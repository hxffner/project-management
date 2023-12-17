import { FC, useEffect } from "react";
import { Task } from "../../../types/Event";
import AddSubTask from "./AddSubTask";
import UploadFile from "./UploadFile";
import { selectToken } from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchFile, selectFileData } from "../../../features/event/eventSlice";

type TaskInformationModalProps = {
  task: Task;
};

const TaskInformationModal: FC<TaskInformationModalProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const fileData = useAppSelector(selectFileData);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        await dispatch(fetchFile({ fileId: task.id, token: token! }));
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };
  
    fetchFileData();
  }, [dispatch, task.id, token]);
  
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
          <AddSubTask task={task} />
          <UploadFile task={task} />
          {fileData && (
            <div>
              <h2>Fetched File Data</h2>
              {/* Convert binary data to base64-encoded string */}
              <img
                src={`data:image/png;base64,${btoa(
                  String.fromCharCode.apply(null, fileData)
                )}`}
                alt="File Preview"
              />
            </div>
          )}

        </div>
      </dialog>
    </div>
  );
};

export default TaskInformationModal;
