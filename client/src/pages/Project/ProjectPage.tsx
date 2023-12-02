import { FC } from "react";
import CreateModal from "./components/CreateModal";

const ProjectPage: FC = () => {
  return (
    <div className="border rounded-xl mx-8 bg-base-300 border-base-200">
      <div className="h-full m-8 rounded-lg">
        <div className="flex justify-between mb-8">
          <button className="btn btn-ghost normal-case text-xl">Projects</button>
          <div className="flex gap-2">
            <div className="divider divider-horizontal"></div>
            <button
              className="join-item btn btn-ghost normal-case text-xl"
              onClick={() => {
                (
                  document!.getElementById("create_project_modal") as HTMLFormElement
                ).showModal();
              }}
            >
              Create Project
            </button>
            <CreateModal />
          </div>
        </div>
      </div>
      ViewComponent
    </div>
  );
};

export default ProjectPage;
