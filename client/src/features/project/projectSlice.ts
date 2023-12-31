import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProjectResponse, projectService } from "./projectService";
import { RootState } from "../../app/store";

interface ProjectState {
  projects:
    | null
    | {
        id: string;
        name: string;
        description: string;
        relatedTasks: string[];
        projectMembers: string;
        startDate: string;
        endDate: string;
        dueDate: string;
      }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  status: "idle",
  error: null,
};

export const getProjectsByUserId = createAsyncThunk(
  "project/getProjectsByUserId",
  async (details: {
    userId: string;
    token: string;
  }): Promise<ProjectResponse[]> => {
    try {
      const response = await projectService.getProjectsByUserId(
        details.userId,
        details.token
      );
      return response;
    } catch (error) {
      console.error(
        `Error fetching projects for user with ID ${details.userId}:`,
        error
      );
      throw error;
    }
  }
);

export const getProjectById = createAsyncThunk(
  "project/getProjectById",
  async (details: { id: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await projectService.getProjectById(
        details.id,
        details.token
      );
      return response;
    } catch (error) {
      console.error(`Error fetching project with ID ${details.id}:`, error);
      throw rejectWithValue(`Failed to fetch project with ID ${details.id}`);
    }
  }
);

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (token: string): Promise<ProjectResponse[]> => {
    try {
      const response = await projectService.getProjects(token);
      return response;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (details: {
    name: string;
    description: string;
    token: string;
  }): Promise<ProjectResponse> => {
    const response = await projectService.createProject(
      details.name,
      details.description,
      details.token
    );

    return response;
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (details: { id: string; token: string }): Promise<void> => {
    try {
      await projectService.deleteProject(details.id, details.token);
    } catch (error) {
      console.error(`Error deleting project with ID ${details.id}:`, error);
      throw error;
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (
    details: { project: ProjectResponse; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await projectService.updateProject(
        details.project,
        details.token
      );
      return response;
    } catch (error) {
      console.error(
        `Error updating project with ID ${details.project.id}:`,
        error
      );
      throw rejectWithValue(
        `Failed to update project with ID ${details.project.id}`
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getProjectsByUserId.fulfilled,
        (state, action: PayloadAction<ProjectResponse[]>) => {
          state.status = "succeeded";
          state.projects = action.payload;
        }
      )
      .addCase(getProjectsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch projects by user ID";
      })
      .addCase(getProjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getProjectById.fulfilled,
        (state, action: PayloadAction<ProjectResponse>) => {
          state.status = "succeeded";
          state.projects = [action.payload];
        }
      )
      .addCase(getProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch project by ID";
      })
      .addCase(getProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getProjects.fulfilled,
        (state, action: PayloadAction<ProjectResponse[]>) => {
          state.status = "succeeded";
          state.projects = action.payload;
        }
      )
      .addCase(getProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<ProjectResponse>) => {
          state.status = "succeeded";
          state.projects = state.projects
            ? [...state.projects, action.payload]
            : [action.payload];
        }
      )
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Project creation failed";
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedProjectIndex = state.projects!.findIndex(
          (project) => project.id === action.meta.arg.id
        );

        if (deletedProjectIndex !== -1) {
          state.projects!.splice(deletedProjectIndex, 1);
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete project";
      })
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<ProjectResponse>) => {
          state.status = "succeeded";
          state.projects = state.projects!.map((project) =>
            project.id === action.payload.id ? action.payload : project
          );
        }
      )
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update project";
      });
  },
});

export const selectProjects = (state: RootState) => state.project.projects;

export default projectSlice.reducer;
