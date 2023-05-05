import { createRef, useState } from "react";
import "./App.css";
import { DatePicker, Select, Input, Button } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";
import { Dayjs } from "dayjs";

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

  return (
    <>
      <form className="form" ref={formRef}>
        <h1>Форма выбора переговорных</h1>
        <Select
          options={[{ value: "Башня А" }, { value: "Башня Б" }]}
          onSelect={setTower}
          value={tower}
        />
        <Select value={floor} options={getFloorValues()} onSelect={setFloor} />
        <Select
          value={meetingRoom}
          options={getMeetingRoomValues()}
          onSelect={setMeetingRoom}
        />
        <DatePicker
          showTime={{ format: "HH:mm" }}
          format="DD-MM-YYYY HH:mm"
          placeholder="Выберите дату и время"
          onOk={setDate}
          value={date}
          locale={locale}
        />
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
    </>
  );
}

export default App;
