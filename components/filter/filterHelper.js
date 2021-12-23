export const dateFilterHelper = (value) => {
  if (value === "today") {
    return (el) =>
      new Date(el.Received.text).toDateString() ===
      new Date(Date.now()).toDateString();
  } else if (value === "yesterday") {
    return (el) =>
      new Date(el.Received.text).toDateString() ===
      new Date(Date.now() - 86400000).toDateString();
  } else if (value === "last_week") {
    return (el) =>
      new Date(el.Received.text) >= new Date(Date.now() - 86400000 * 7) &&
      new Date(el.Received.text) <= new Date(Date.now());
  } else if (value === "this_month") {
    return (el) =>
      new Date(el.Received.text) >=
        //первый день этого месяца
        new Date(new Date(Date.now()).setDate(1)) &&
      new Date(el.Received.text) <= new Date(Date.now());
  } else if (value === "month_before") {
    return (el) =>
      new Date(el.Received.text) >=
        //первый день прошлого месяца
        new Date(new Date(new Date(Date.now()).setDate(0)).setDate(1)) &&
      new Date(el.Received.text) <=
        //последний день прошлого месяца
        new Date(new Date(Date.now()).setDate(0));
  }
};

export const durationFilterHelper = (value) => {
  if (value === 1) {
    return (el) => el.Duration.text <= 60;
  } else if (value === 3) {
    return (el) => el.Duration.text <= 60 * 3;
  } else if (value === 5) {
    return (el) => el.Duration.text <= 60 * 5;
  } else if (value === 10) {
    return (el) => el.Duration.text <= 60 * 10;
  }
};
