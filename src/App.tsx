import { createRef, useState } from "react";
import "./App.css";
import { DatePicker, Select, Input, Button, TimePicker } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import {
  getFloorValues,
  getMeetingRoomValues,
  disabledDate,
  disabledDateTime,
} from "./utils";

type RangeValue = [Dayjs | null, Dayjs | null] | null;

function App() {
  const { TextArea } = Input;
  const formRef = createRef<HTMLFormElement>();

  const TOWER_INPUT_DEFAULT_VALUE = "Выберите башню";
  const FLOOR_INPUT_DEFAULT_VALUE = "Выберите этаж";
  const MEETING_ROOM_DEFAULT_VALUE = "Выберите переговорную";

  const [tower, setTower] = useState(TOWER_INPUT_DEFAULT_VALUE);
  const [floor, setFloor] = useState(FLOOR_INPUT_DEFAULT_VALUE);
  const [meetingRoom, setMeetingRoom] = useState(MEETING_ROOM_DEFAULT_VALUE);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<RangeValue>(null);
  const [comment, setComment] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);

  const resetFormInputs = () => {
    setTower(TOWER_INPUT_DEFAULT_VALUE);
    setFloor(FLOOR_INPUT_DEFAULT_VALUE);
    setMeetingRoom(MEETING_ROOM_DEFAULT_VALUE);
    setDate(null);
    setIsDateSelected(false);
    setTime([null, null]);
    setComment("");
  };

  const showFormValues = () => {
    if (
      tower === TOWER_INPUT_DEFAULT_VALUE ||
      floor === FLOOR_INPUT_DEFAULT_VALUE ||
      meetingRoom === MEETING_ROOM_DEFAULT_VALUE ||
      date === null ||
      time === null
    )
      return;
    console.log(
      JSON.stringify({
        tower,
        floor,
        meetingRoom,
        date,
        time,
        comment,
      })
    );
  };

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
            />
            <TimePicker.RangePicker
              showSecond={false}
              disabled={!isDateSelected}
              locale={locale}
              disabledTime={() => disabledDateTime(date)}
              onOk={(e) => {
                if (e == null) return;
                const [firstDate, secondDate] = e;
                if (firstDate?.isAfter(secondDate))
                  setTime([secondDate, firstDate]);
                else setTime(e);
              }}
              value={time}
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
