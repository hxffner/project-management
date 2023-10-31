import { FC, useState, useEffect } from "react";
import { getMonth } from "../../../utils/calendarUtils";
import { Dayjs } from "dayjs";

interface Props {
  date: Dayjs;
}

const MonthView: FC<Props> = ({date}) => {
  const [month, setMonth] = useState<Dayjs[][]>(getMonth(date.year(), date.month()));
  console.table(month);
  useEffect(() => {
    setMonth(getMonth(date.year(), date.month()));
  }, [date]);

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
