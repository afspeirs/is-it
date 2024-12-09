type Date = {
  name: string,
  day: string,
  month: string,
  valueYes?: string,
  valueNo?: string,
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

export const date = $state<{ current: Partial<Date> | null }>({ current: null });
export const dates = $state(initialState);
