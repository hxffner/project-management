import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProjectById,
  selectProjects,
} from "../../features/project/projectSlice";
import { selectToken } from "../../features/auth/authSlice";
import CreateTaskModal from "./components/CreateTaskModal";

const ProjectDetailPage: FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const project = projects?.[0];
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (projectId && token) {
      dispatch(getProjectById({ id: projectId, token }));
    }
  }, [dispatch, projectId, token]);

  console.log("ProjectDetailPage: project", project);

  return (
    <div>
      {project ? (
        <div className="flex justify-between mx-16">
          <div className="">
            <div className="text-xl font-bold">{project.name}</div>
            <div className="text-md">{project.description}</div>
          </div>
          <div>
            <button
              className="join-item btn btn-ghost normal-case text-xl"
              onClick={() => {
                (
                  document!.getElementById("add_task_modal") as HTMLFormElement
                ).showModal();
              }}
            >
              Add Task
            </button>
            <CreateTaskModal />
          </div>
        </div>
      ) : (
        <div>No Project</div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
