import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProjectResponse, projectService } from "./projectService";

interface ProjectState {
  project: null | {
    name: string;
    description: string;
    // startDate: string;
    // endDate: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  status: "idle",
  error: null,
};

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
      // details.startDate,
      // details.endDate,
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
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<ProjectResponse>) => {
          state.status = "succeeded";
          state.project = {
            name: action.payload.name,
            description: action.payload.description,
            // startDate: action.payload.startDate,
            // endDate: action.payload.endDate,
          };
        }
      )
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Project creation failed";
      });
  },
});

export default projectSlice.reducer;
