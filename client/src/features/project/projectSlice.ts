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
      });
  },
});

export const selectProjects = (state: RootState) => state.project.projects;

export default projectSlice.reducer;
