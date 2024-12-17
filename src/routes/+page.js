import { dates } from '$lib/context/dates.svelte';
import { generateSearchParams } from '$lib/utils/generateSearchParamsFromObject';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  const day = url.searchParams.get('day') || undefined;
  const month = url.searchParams.get('month') || undefined;
  const name = url.searchParams.get('name') || undefined;
  const valueYes = url.searchParams.get('valueYes') || undefined;
  const valueNo = url.searchParams.get('valueNo') || undefined;

  if (!day || !month) {
    if (dates.all.length > 1) {
      redirect(302, `/?${generateSearchParams(dates.all[0])}`);
    }

    error(404, 'Date not found');
  }

  const currentDate = {
    day,
    month,
    name: name || `${day}/${month}`,
    valueYes,
    valueNo,
  };

  dates.setCurrent(currentDate);

  const todayDate = new Date();
  const todayDay = todayDate.getDay();
  const todayMonth = todayDate.getMonth();

  const isToday = todayDay === parseInt(day, 10) && todayMonth === parseInt(month, 10);

  return {
    date: currentDate,
    isToday,
  };
}
