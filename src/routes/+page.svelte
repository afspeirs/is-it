<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { dates } from '$lib/context/dates.svelte';
  import { SaveIcon } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  // console.log(data);

  const foundDate = $derived(dates.all.find((date) => (
    date.day === data.date.day &&
    date.month === data.date.month
  )));

  // $inspect({ foundDate });
</script>

<span class="text-9xl font-bold uppercase">
  {#if data.isToday}
    {data.date.valueYes || 'Yes'}
  {:else}
    {data.date.valueNo || 'No'}
  {/if}
</span>

{#if !foundDate}
  <Button
    icon={SaveIcon}
    className="absolute bottom-2 right-2"
    fullWidth={false}
    colour="primary"
  >
    Save Date
  </Button>
{/if}
