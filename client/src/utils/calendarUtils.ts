import dayjs, { Dayjs } from "dayjs";

export const getMonth = (year: number = dayjs().year(), month: number = dayjs().month()): Dayjs[][] => {
  const currentDate = dayjs().year(year).month(month);
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();

  let currentMonthCount = 1;
  const matrix = [];
  let currentRow = [];
  let date = startOfMonth.subtract(startDay, 'day');

  for (let row = 0; row < 5; row++) {
    currentRow = [];
    for (let col = 0; col < 7; col++) {
      currentRow.push(dayjs(date));
      date = date.add(1, 'day');
      currentMonthCount++;

      if (currentMonthCount > currentDate.daysInMonth() + startDay) {
        date = date.subtract(currentDate.daysInMonth(), 'day');
        currentMonthCount = 1;
      }
    }
    matrix.push(currentRow);
  }

  return matrix;
};