import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";

export function getFloorValues() {
  const floorValues = [];
  const MIN_FLOOR = 3;
  const MAX_FLOOR = 27;
  for (let i = MIN_FLOOR; i <= MAX_FLOOR; i++) {
    floorValues.push({
      value: i,
    });
  }
  return floorValues;
}

export function getMeetingRoomValues() {
  const meetingRoomValues = [];
  const MIN = 1;
  const MAX = 10;
  for (let i = MIN; i <= MAX; i++) {
    meetingRoomValues.push({
      value: `Переговорная №${i}`,
    });
  }
  return meetingRoomValues;
}

export const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current < dayjs().add(-1, "d");
};

export function range(start: number, end: number) {
  const result = [];

  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

export function isToday(e: Dayjs | null) {
  if (e == null) return;
  const today = new Date();
  return (
    e.date() == today.getDate() &&
    e.month() == today.getMonth() &&
    e.year() == today.getFullYear()
  );
}

export const disabledDateTime = (date: Dayjs | null) => ({
  disabledHours: () => {
    if (isToday(date)) return range(0, 24).splice(0, dayjs().hour());
    return [];
  },
  disabledMinutes: (hour: number) => {
    if (isToday(date) && date?.hour() === hour)
      return range(0, 59).splice(0, dayjs().minute());
    return [];
  },
});
