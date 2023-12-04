import { FC, useState } from "react";
import WeekView from "./components/WeekView";
import MonthView from "./components/MonthView";
import dayjs, { Dayjs } from "dayjs";
import AddModal from "./components/AddModal";

const CalendarPage: FC = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [selectedView, setSelectedView] = useState<string>("week");

  let viewComponent;

  if (selectedView === "month") {
    viewComponent = <MonthView date={date} />;
  } else if (selectedView === "week") {
    viewComponent = <WeekView />;
  }

  return (
    <div className="border rounded-xl mx-8 bg-base-300 border-base-200">
      <div className="h-full m-8 rounded-lg">
        <div className="flex justify-between mb-8">
          <button className="btn btn-ghost normal-case text-xl">
            {date.format("MMMM YYYY")}
          </button>
          <div className="flex gap-2">
            <div className="join">
              <button
                className="join-item btn btn-ghost normal-case text-xl"
                onClick={() => {
                  setDate(date.subtract(1, "month"));
                }}
              >
                {"<"}
              </button>
              <button
                className="join-item btn btn-ghost normal-case text-xl"
                onClick={() => {
                  setDate(dayjs());
                }}
              >
                Today
              </button>
              <button
                className="join-item btn btn-ghost normal-case text-xl"
                onClick={() => {
                  setDate(date.add(1, "month"));
                }}
              >
                {">"}
              </button>
            </div>
            <select
              className="select select-ghost w-full max-w-xs text-xl font-semibold"
              value={selectedView}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedView(e.target.value);
              }}
            >
              <option value={`day`}>Day View</option>
              <option value={`week`}>Week View</option>
              <option value={`month`}>Month View</option>
              <option value={`year`}>Year View</option>
            </select>
            <div className="divider divider-horizontal"></div>
            <button
              className="join-item btn btn-ghost normal-case text-xl"
              onClick={() => {
                (
                  document!.getElementById("add_event_modal") as HTMLFormElement
                ).showModal();
              }}
            >
              Add Event
            </button>
            <AddModal />
          </div>
        </div>
      </div>
      {viewComponent}
    </div>
  );
};

export default CalendarPage;
