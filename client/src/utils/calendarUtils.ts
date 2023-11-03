import dayjs, { Dayjs } from "dayjs";

export const getMonth = (year: number, month: number): Dayjs[][] => {
  const currentDate = dayjs().year(year).month(month);
  const startOfMonth = currentDate.startOf("month");
  const startDay = (startOfMonth.day() + 6) % 7;
  const daysInMonth = currentDate.daysInMonth();
  const numRows = Math.ceil((daysInMonth + startDay) / 7);

  const matrix = [];
  let currentRow = [];
  let date = startOfMonth.subtract(startDay, 'day');

  for (let row = 0; row < numRows; row++) {
    currentRow = [];
    for (let col = 0; col < 7; col++) {
      currentRow.push(dayjs(date));
      date = date.add(1, 'day');
      
    }
    matrix.push(currentRow);
  }

  return matrix;
};

