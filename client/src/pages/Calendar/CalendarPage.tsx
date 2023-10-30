import { FC } from "react";
// import WeekView from "./components/WeekView";
import MonthView from "./components/MonthView";

const CalendarPage: FC = () => {
  return (
    <div className="border rounded-xl mx-8 bg-base-300 border-base-200">
      <div className="h-full m-8 rounded-lg">
        <div className="flex justify-between mb-8">
          <button className="btn btn-ghost normal-case text-xl">October 2023</button>
          <div className="flex gap-2">
            <div className="join">
              <button className="join-item btn btn-ghost normal-case text-xl">
                {"<"}
              </button>
              <button className="join-item btn btn-ghost normal-case text-xl">
                Today
              </button>
              <button className="join-item btn btn-ghost normal-case text-xl">
                {">"}
              </button>
            </div>
            <select className="select select-ghost w-full max-w-xs text-xl font-semibold">
              <option>Day View</option>
              <option selected>Week View</option>
              <option>Month View</option>
              <option>Year View</option>
            </select>
            <div className="divider divider-horizontal"></div>
            <button className="join-item btn btn-ghost normal-case text-xl">
              Add Event
            </button>
          </div>
        </div>
        {/* <WeekView /> */}
      </div>
      <MonthView />
    </div>
  );
};

export default CalendarPage;
