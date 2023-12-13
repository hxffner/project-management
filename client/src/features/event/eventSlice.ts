import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EventResponse, eventService } from "./eventService";
import { ProjectResponse } from "../project/projectService";
import { Event, SubTask, Task } from "../../types/Event";
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
  events: Event[];
}

const initialState: EventState = {
  event: null,
  status: "idle",
  error: null,
  tasks: [],
  events: [],
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

export const getEventByUserId = createAsyncThunk(
  "event/getEventByUserId",
  async (details: { userId: string; token: string }): Promise<Event[]> => {
    const response = await eventService.getEventByUserId(
      details.userId,
      details.token
    );
    return response;
  }
);

export const createSubtaskToTask = createAsyncThunk(
  "event/createSubtaskToTask",
  async (details: {
    taskId: string;
    name: string;
    desc: string;
    token: string;
  }): Promise<SubTask> => {
    const response = await eventService.createSubtaskToTask(
      details.taskId,
      details.name,
      details.desc,
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
      })
      .addCase(getEventByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getEventByUserId.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          state.status = "succeeded";
          state.events = action.payload;
        }
      )
      .addCase(getEventByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message || "Failed to fetch tasks by project ID";
      })
      .addCase(createSubtaskToTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createSubtaskToTask.fulfilled,
        (
          state,
          action: PayloadAction<SubTask, string, { arg: { taskId: string } }>
        ) => {
          state.status = "succeeded";
          state.tasks = state.tasks.map((task) =>
            task.id === Number(action.meta.arg.taskId)
              ? {
                  ...task,
                  subtasks: [...task.subTasks, action.payload],
                }
              : task
          );
        }
      )

      .addCase(createSubtaskToTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create subtask";
      });
  },
});

export const selectTasks = (state: RootState) => state.event.tasks;
export const selectEvents = (state: RootState) => state.event.events;

export default eventSlice.reducer;
