<script lang="ts">
  import { createDialog, melt } from '@melt-ui/svelte';
  import { CalendarIcon, MenuIcon, Trash2Icon, XIcon } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';

  import { page } from '$app/stores';
  import AddDate from '$lib/components/AddDate.svelte';
  import Button from '$lib/components/Button.svelte';
  import { dates } from '$lib/context/dates.svelte';
  import { generateSearchParams } from '$lib/utils/generateSearchParamsFromObject';

  const {
    elements: {
      trigger,
      overlay,
      content,
      title,
      close,
      portalled,
    },
    states: { open },
  } = createDialog({
    forceVisible: true,
  });
</script>

<Button
  colour="primary"
  element={trigger}
  icon={MenuIcon}
  iconOnly
>
  Open Sidebar
</Button>

{#if $open}
  <div class="text-dark dark:text-light" use:melt={$portalled}>
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 bg-primary/70 dark:bg-black/70 backdrop-blur-sm"
      transition:fade={{ duration: 200 }}
    ></div>
    <div
      use:melt={$content}
      class="fixed left-0 top-0 flex flex-col z-50 h-screen w-full max-w-80 bg-white shadow-lg focus:outline-none"
      transition:fly={{
        x: -350,
        duration: 200,
        opacity: 1,
      }}
    >
      <div class="flex justify-between items-center p-2">
        <h2 use:melt={$title} class="text-xl font-bold">
          Is is ...
        </h2>

        <Button
          element={close}
          icon={XIcon}
          iconOnly
        >
          Close Sidebar
        </Button>
      </div>

      <div class="p-2 space-y-1">
        {#each dates.all as date}
          {@const param = generateSearchParams(date)}
          <div class="flex">
            <Button
              active={$page.url.search.includes(param)}
              icon={CalendarIcon}
              href={`/?${param}`}
            >
              {date.name}
            </Button>
            <Button
              icon={Trash2Icon}
              iconOnly
              iconClassName="text-danger"
              onclick={() => dates.removeDate(date)}
            >
              {date.name}
            </Button>
          </div>
        {/each}

        <AddDate />
      </div>

      <div class="mt-auto text-center text-xs p-1 select-none">
        {import.meta.env.APP_VERSION}
      </div>
    </div>
  </div>
{/if}
