import { FC, useEffect } from "react";
import CreateModal from "./components/CreateModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProjectsByUserId,
  selectProjects,
} from "../../features/project/projectSlice";
import { selectToken, selectUser } from "../../features/auth/authSlice";
import ProjectBox from "./components/ProjectBox";

const ProjectPage: FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (token !== null && user?.userId !== null) {
      dispatch(getProjectsByUserId({ userId: user!.userId, token }));
    }
  }, [dispatch, token, user]);

  return (
    <div className="border rounded-xl mx-8 bg-base-300 border-base-200">
      <div className="h-full m-8 rounded-lg">
        <div className="flex justify-between mb-8">
          <button className="btn btn-ghost normal-case text-xl">
            Projects
          </button>
          <div className="flex gap-2">
            <div className="divider divider-horizontal"></div>
            <button
              className="join-item btn btn-ghost normal-case text-xl"
              onClick={() => {
                (
                  document!.getElementById(
                    "create_project_modal"
                  ) as HTMLFormElement
                ).showModal();
              }}
            >
              Create Project
            </button>
            <CreateModal />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 m-8">
        {projects &&
          projects.map((project, i) => (
            <ProjectBox key={i} project={project} />
          ))}
      </div>
    </div>
  );
};

export default ProjectPage;
