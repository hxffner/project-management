import { FC, useState } from "react";
import { getMonth } from "../../../utils/calendarUtils";
import { Dayjs } from "dayjs";

const MonthView: FC = () => {
  const [month, setMonth] = useState<Dayjs[][]>(getMonth());

  return (
    <div className="flex flex-wrap justify-center mb-8">
      <div>
        {month.map((week, weekIndex) => (
          <div key={weekIndex} className="flex w-full">
            {week.map((day, dayIndex) => (
              <div>
                <div className="flex justify-center ">
                  {weekIndex === 0 && (
                    <p className="text-2xl mt-1">
                      {day.format("ddd").toUpperCase()}
                    </p>
                  )}
                </div>

                <div
                  key={dayIndex}
                  className="flex items-start justify-start w-1/7 p-4 border border-base-200 w-52 h-24"
                >
                  {day ? day.date() : ""}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
