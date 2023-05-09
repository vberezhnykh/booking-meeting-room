import { createRef, useState } from "react";
import { DatePicker, Select, Input, Button, TimePicker, message } from "antd";
import { GithubOutlined } from "@ant-design/icons";
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

  const [tower, setTower] = useState(null);
  const [floor, setFloor] = useState(null);
  const [meetingRoom, setMeetingRoom] = useState(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<RangeValue>(null);
  const [comment, setComment] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);

  const resetFormInputs = () => {
    setTower(null);
    setFloor(null);
    setMeetingRoom(null);
    setDate(null);
    setIsDateSelected(false);
    setTime(null);
    setComment("");
  };

  const [messageApi, contextHolder] = message.useMessage();
  const warning = (message: string) => {
    messageApi.open({
      type: "warning",
      content: message,
    });
  };

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const showFormValues = () => {
    const fields = [tower, floor, meetingRoom, date, time];
    if (fields.includes(null)) {
      const errorFields = [];
      tower == null ? errorFields.push("башню") : false;
      floor == null ? errorFields.push("этаж") : false;
      meetingRoom == null ? errorFields.push("переговорную") : false;
      date == null ? errorFields.push("дату") : false;
      time == null ? errorFields.push("время") : false;
      warning(`Необходимо выбрать ${errorFields.join(", ")}`);
      return;
    }

    success("Данные отправлены в консоль");
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
          {contextHolder}
          <Select
            options={[{ value: "Башня А" }, { value: "Башня Б" }]}
            onSelect={setTower}
            value={tower}
            placeholder="Выберите башню"
          />
          <Select
            value={floor}
            options={getFloorValues()}
            onSelect={setFloor}
            placeholder="Выберите этаж"
          />
          <Select
            value={meetingRoom}
            options={getMeetingRoomValues()}
            onSelect={setMeetingRoom}
            placeholder="Выберите переговорную"
          />
          <fieldset className="date-time-container">
            <DatePicker
              placeholder="Выберите дату"
              onChange={(e) => {
                setDate(e);
                if (e != null) setIsDateSelected(true);
                else {
                  setIsDateSelected(false);
                  setTime(null);
                }
              }}
              value={date}
              locale={locale}
              disabledDate={disabledDate}
              className="datepicker"
              inputReadOnly
            />
            <TimePicker.RangePicker
              showSecond={false}
              disabled={!isDateSelected}
              locale={locale}
              disabledTime={() => disabledDateTime(date)}
              hideDisabledOptions={true}
              onOk={(e) => {
                if (e == null) return;
                const [firstDate, secondDate] = e;
                if (firstDate?.isAfter(secondDate))
                  setTime([secondDate, firstDate]);
                else setTime(e);
              }}
              defaultValue={null}
              value={time}
              inputReadOnly
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
      <footer>
        <a
          href="https://github.com/vberezhnykh"
          target="_blank"
          className="github"
        >
          <GithubOutlined />
        </a>
      </footer>
    </>
  );
}

export default App;
