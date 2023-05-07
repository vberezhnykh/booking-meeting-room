import { createRef, useState } from "react";
import "./App.css";
import { DatePicker, Select, Input, Button, TimePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";

function App() {
  const { TextArea } = Input;
  const formRef = createRef<HTMLFormElement>();

  const getFloorValues = () => {
    const floorValues = [];
    const MIN_FLOOR = 3;
    const MAX_FLOOR = 27;
    for (let i = MIN_FLOOR; i <= MAX_FLOOR; i++) {
      floorValues.push({
        value: i,
      });
    }
    return floorValues;
  };

  const getMeetingRoomValues = () => {
    const meetingRoomValues = [];
    const MIN = 1;
    const MAX = 10;
    for (let i = MIN; i <= MAX; i++) {
      meetingRoomValues.push({
        value: `Переговорная №${i}`,
      });
    }
    return meetingRoomValues;
  };
  const TOWER_INPUT_DEFAULT_VALUE = "Выберите башню";
  const FLOOR_INPUT_DEFAULT_VALUE = "Выберите этаж";
  const MEETING_ROOM_DEFAULT_VALUE = "Выберите переговорную";

  const [tower, setTower] = useState(TOWER_INPUT_DEFAULT_VALUE);
  const [floor, setFloor] = useState(FLOOR_INPUT_DEFAULT_VALUE);
  const [meetingRoom, setMeetingRoom] = useState(MEETING_ROOM_DEFAULT_VALUE);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [comment, setComment] = useState("");

  const resetFormInputs = () => {
    setTower(TOWER_INPUT_DEFAULT_VALUE);
    setFloor(FLOOR_INPUT_DEFAULT_VALUE);
    setMeetingRoom(MEETING_ROOM_DEFAULT_VALUE);
    setDate(null);
    setComment("");
    setIsDateSelected(false);
  };

  const showFormValues = () => {
    if (
      tower === TOWER_INPUT_DEFAULT_VALUE ||
      floor === FLOOR_INPUT_DEFAULT_VALUE ||
      meetingRoom === MEETING_ROOM_DEFAULT_VALUE ||
      date === null
    )
      return;
    console.log(
      JSON.stringify({
        tower,
        floor,
        meetingRoom,
        date,
        comment,
      })
    );
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current < dayjs().add(-1, "d");
  };

  const range = (start: number, end: number) => {
    const result = [];

    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const isToday = (e: Dayjs | null) => {
    if (e == null) return;
    const today = new Date();
    return (
      e.date() == today.getDate() &&
      e.month() == today.getMonth() &&
      e.year() == today.getFullYear()
    );
  };

  const disabledDateTime = () => ({
    disabledHours: () => {
      if (isToday(date)) return range(0, 24).splice(0, dayjs().hour());
      return [];
    },
    disabledMinutes: () => {
      if (isToday(date)) return range(0, 59).splice(0, dayjs().minute());
      return [];
    },
  });

  const [isDateSelected, setIsDateSelected] = useState(false);

  return (
    <>
      <main>
        <form className="form" ref={formRef}>
          <h1>Форма бронирования переговорных</h1>
          <Select
            options={[{ value: "Башня А" }, { value: "Башня Б" }]}
            onSelect={setTower}
            value={tower}
          />
          <Select
            value={floor}
            options={getFloorValues()}
            onSelect={setFloor}
          />
          <Select
            value={meetingRoom}
            options={getMeetingRoomValues()}
            onSelect={setMeetingRoom}
          />
          <fieldset className="date-time-container">
            <DatePicker
              placeholder="Выберите дату"
              onChange={(e) => {
                setDate(e);
                setIsDateSelected(true);
              }}
              value={date}
              locale={locale}
              disabledDate={disabledDate}
              className="datepicker"
              /* disabledTime={disabledDateTime} */
            />
            <TimePicker.RangePicker
              showSecond={false}
              disabled={!isDateSelected}
              locale={locale}
              disabledTime={disabledDateTime}
            />
          </fieldset>
          <TextArea
            autoSize
            placeholder="Поле для комментариев..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <fieldset className="form__buttons">
            <Button type="primary" onClick={showFormValues}>
              Отправить
            </Button>
            <Button type="primary" danger onClick={resetFormInputs}>
              Очистить
            </Button>
          </fieldset>
        </form>
      </main>
      <footer>GitHub</footer>
    </>
  );
}

export default App;
