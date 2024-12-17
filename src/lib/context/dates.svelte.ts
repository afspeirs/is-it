import { browser } from '$app/environment';

type Date = {
  name: string,
  day: string,
  month: string,
  valueYes?: string,
  valueNo?: string,
};
type DateContext = {
  all: Date[],
  current: Date | null,
  addDate: (date: Date) => void,
  // removeDate: (date: Date) => void,
  setCurrent: (date: Date) => void,
};

const initialState: Date[] = [
  {
    name: 'New Years Day',
    day: '1',
    month: '1',
  },
  {
    name: 'April Fools Day',
    day: '1',
    month: '4',
    valueYes: 'No',
    valueNo: 'Yes',
  },
  {
    name: 'Christmas day',
    day: '25',
    month: '12',
  },
];

export const dates = $state<DateContext>({
  all: JSON.parse((browser && localStorage.getItem('dates-all')) || JSON.stringify(initialState)),
  current: null,
  addDate(date: Date) {
    // Have to recreate the date to make sure the day and month as strings
    const newDate = {
      name: date.name,
      day: date.day.toString(),
      month: date.month.toString(),
      valueYes: date.valueYes,
      valueNo: date.valueNo,
    };

    if (newDate.valueNo === '') {
      delete newDate.valueNo;
    }
    if (newDate.valueYes === '') {
      delete newDate.valueYes;
    }

    this.all.push(newDate);

    if (browser) {
      localStorage.setItem('dates-all', JSON.stringify(this.all));
    }
  },
  setCurrent(date: Date) {
    this.current = date;
  },
});
