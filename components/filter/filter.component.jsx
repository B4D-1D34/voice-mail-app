import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { dateFilterHelper, durationFilterHelper } from "./filterHelper";
import styles from "./filter.module.css";

const Filter = ({ messages, setFilteredData }) => {
  const [period, setPeriod] = useState("");
  const [number, setNumber] = useState("");
  const [duration, setDuration] = useState("");
  const data = messages.elements[0].elements.map((el) =>
    el.elements.reduce((acc, el) => ({ ...acc, [el.name]: el.elements[0] }), {})
  );

  useEffect(() => setFilteredData(data), []);
  useEffect(() => handleFilter(), [period, number, duration]);

  //хэндлер который собирает все фильтры
  const handleFilter = () => {
    let filteredResult = data;
    let cb;
    //фильтрация по дате
    //возвращает колбек для filter соответствующий выбраному параметру фильтрации
    if (period) {
      cb = dateFilterHelper(period);
      filteredResult = filteredResult.filter(cb);
    }
    //фильтрация по длительности
    //возвращает колбек для filter соответствующий выбраному параметру фильтрации
    if (duration) {
      cb = durationFilterHelper(duration);
      filteredResult = filteredResult.filter(cb);
    }
    //фильтрация по номеру
    if (number) {
      filteredResult = filteredResult.filter((el) =>
        el.From.text.includes(number)
      );
    }
    setFilteredData(filteredResult);
  };

  const handleNumberChange = (e) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handlePeriodChange = (e) => {
    const { value } = e.target;
    setPeriod(value);
  };

  const handleDurationChange = (e) => {
    const { value } = e.target;
    setDuration(value);
  };

  const handleReset = () => {
    if (period || number || duration) {
      setPeriod("");
      setNumber("");
      setDuration("");
      setFilteredData(data);
    }
  };
  return (
    <form className={styles.filter}>
      <div className={styles.period}>
        <p>Период</p>
        <FormControl sx={{ m: 0, minWidth: "100%" }}>
          <Select
            sx={{ p: 0 }}
            className={styles.filterInput}
            value={period}
            onChange={handlePeriodChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Все время</em>
            </MenuItem>
            <MenuItem value={"today"}>Сегодня</MenuItem>
            <MenuItem value={"yesterday"}>Вчера</MenuItem>
            <MenuItem value={"last_week"}>Последняя неделя</MenuItem>
            <MenuItem value={"this_month"}>Текущий месяц</MenuItem>
            <MenuItem value={"month_before"}>Прошлый месяц</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.number}>
        <p>Номер</p>
        <input
          className={styles.filterInput}
          type="search"
          value={number}
          onChange={handleNumberChange}
        />
      </div>
      <div className={styles.duration}>
        <p>Длительность</p>
        <FormControl sx={{ m: 0, minWidth: "100%", p: 0 }}>
          <Select
            sx={{ p: 0 }}
            value={duration}
            className={styles.filterInput}
            onChange={handleDurationChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Все</em>
            </MenuItem>
            <MenuItem value={1}>До 1 минуты</MenuItem>
            <MenuItem value={3}>До 3 минут</MenuItem>
            <MenuItem value={5}>До 5 минут</MenuItem>
            <MenuItem value={10}>До 10 минут</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.resetForm}>
        <div className={styles.resetBtn} onClick={handleReset}>
          Сбросить фильтр
        </div>
      </div>
    </form>
  );
};
export default Filter;
