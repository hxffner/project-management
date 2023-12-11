import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventResponse, eventService } from "./eventService";
import { ProjectResponse } from "../project/projectService";
import { Task } from "../../types/Event";
import { RootState } from "../../app/store";

interface EventState {
  event: null | {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  tasks: Task[];
}

const initialState: EventState = {
  event: null,
  status: "idle",
  error: null,
  tasks: [],
};

export const createTask = createAsyncThunk(
  "event/createTask",
  async (details: {
    project: ProjectResponse;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    token: string;
  }): Promise<EventResponse> => {
    const response = await eventService.createTask(
      details.project,
      details.name,
      details.description,
      details.startDate,
      details.endDate,
      details.token
    );

    return response;
  }
);

export const updateTask = createAsyncThunk(
  "event/updateTask",
  async (payload: { task: Task; token: string }): Promise<Task> => {
    const response = await eventService.updateTask(payload.task, payload.token);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "event/deleteTask",
  async (payload: { taskId: number; token: string }): Promise<void> => {
    await eventService.deleteTaskById(payload.taskId, payload.token);
  }
);

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (details: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    token: string;
  }): Promise<EventResponse> => {
    const response = await eventService.createEvent(
      details.name,
      details.description,
      details.startDate,
      details.endDate,
      details.token
    );

    return response;
  }
);

export const getTasksByProjectId = createAsyncThunk(
  "event/getTasksByProjectId",
  async (details: { projectId: string; token: string }): Promise<Task[]> => {
    const response = await eventService.getTasksByProjectId(
      details.projectId,
      details.token
    );
    return response;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createEvent.fulfilled,
        (state, action: PayloadAction<EventResponse>) => {
          state.status = "succeeded";
          state.event = {
            name: action.payload.name,
            description: action.payload.description,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
          };
        }
      )
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Event creation failed";
      })
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createTask.fulfilled,
        (state, action: PayloadAction<EventResponse>) => {
          state.status = "succeeded";
          state.event = {
            name: action.payload.name,
            description: action.payload.description,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
          };
        }
      )
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "succeeded";
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Task update failed";
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter(
          (task) => task.id !== Number(action.meta.arg.taskId)
        );
      
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Task deletion failed";
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Event creation failed";
      })
      .addCase(getTasksByProjectId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getTasksByProjectId.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.status = "succeeded";
          state.tasks = action.payload;
        }
      )
      .addCase(getTasksByProjectId.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch tasks by project ID";
      });
  },
});

export const selectTasks = (state: RootState) => state.event.tasks;

export default eventSlice.reducer;
