import { browser } from '$app/environment';
import { toast } from '$lib/components/Toaster.svelte';

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
  removeDate: (date: Date) => void,
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
    // We have to recreate the date to make sure the day and month as strings
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

    if (browser) localStorage.setItem('dates-all', JSON.stringify(this.all));
  },
  removeDate(date: Date) {
    const indexDate = this.all.findIndex((value) => value === date);
    const removedDate = this.all[indexDate];
    this.all.splice(indexDate, 1);

    if (browser) localStorage.setItem('dates-all', JSON.stringify(this.all));

    // TODO: Navigate to this.all[0]

    toast.add({
      title: `Removed "${removedDate.name}"`,
      button: {
        title: 'Undo',
        onclick: () => {
          this.all.splice(indexDate, 0, removedDate);
          if (browser) localStorage.setItem('dates-all', JSON.stringify(this.all));

          // TODO: Navigate to removedDate?
        },
      },
    });
  },
  setCurrent(date: Date) {
    this.current = date;
  },
});
