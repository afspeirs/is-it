<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { dates } from '$lib/context/dates.svelte';
  import { SaveIcon } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  // console.log(data);

  const currentDate = dates.find((date) => (
    date.day === data.date.day &&
    date.month === data.date.month
  ));

  const isDateStored = (
    currentDate?.day === data.date.day &&
    currentDate?.month === data.date.month &&
    currentDate?.name === data.date.name &&
    currentDate?.valueNo === data.date.valueNo &&
    currentDate?.valueYes === data.date.valueYes
  );

  // $inspect({ isDateStored });
</script>

<span class="text-9xl font-bold uppercase">
  {#if data.isToday}
    {data.date.valueYes || 'Yes'}
  {:else}
    {data.date.valueNo || 'No'}
  {/if}
</span>

{#if !isDateStored}
  <Button
    icon={SaveIcon}
    className="absolute bottom-2 right-2"
    fullWidth={false}
    colour="primary"
  >
    Save Date
  </Button>
{/if}
