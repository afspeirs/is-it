<script lang="ts">
  import { createDialog, melt } from '@melt-ui/svelte';
  import { PlusIcon, XIcon } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';

  import Button from '$lib/components/Button.svelte';
  import { generateSearchParams } from '$lib/utils/generateSearchParamsFromObject';
  import { dates } from '$lib/context/dates.svelte';
  import { goto } from '$app/navigation';

  const {
    elements: {
      trigger,
      overlay,
      content,
      title,
      description,
      close,
      portalled,
    },
    states: { open },

  } = createDialog({
    forceVisible: true,
  });

  let form = $state({
    name: '',
    day: '',
    month: '',
    valueYes: '',
    valueNo: '',
  });
  let formValid = $state({
    name: false,
    day: false,
    month: false,
  });
  let disabled = $derived(!formValid.name || !formValid.day || !formValid.month);
</script>

<Button
  element={trigger}
  icon={PlusIcon}
>
  Create a new date
</Button>

{#if $open}
  <div class="text-dark dark:text-light" use:melt={$portalled}>
    <div
      use:melt={$overlay}
      class="fixed inset-0 z-50 bg-primary/70 dark:bg-black/70 backdrop-blur-sm"
      transition:fade={{ duration: 200 }}
    ></div>
    <div
      class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-screen-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-dark p-4 shadow-lg"
      transition:fly={{
        y: 16,
        duration: 200,
        opacity: 1,
      }}
      use:melt={$content}
    >
      <div class="flex justify-between items-center">
        <h2 use:melt={$title} class="text-xl font-bold">
          Add Date
        </h2>

        <Button
          element={close}
          icon={XIcon}
          iconOnly
        >
          Close
        </Button>
      </div>

      <p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
        Make changes to your profile here. Click save when you're done.
      </p>

      <!-- TODO: fix this form usage to validate better -->
      <!-- <form method="POST" action="/" use:enhance> -->
      <form>
        <fieldset class="mb-4 flex items-center gap-5">
          <label class="w-[90px] text-right text-black" for="name">
            Name
          </label>
          <input
            class="inline-flex h-8 w-full flex-1 items-center justify-center rounded-sm border border-solid px-3 leading-none text-black"
            id="name"
            bind:value={form.name}
            required
            aria-required="true"
            oninput={(e: Event) => {
              const target = e.target as HTMLInputElement;
              formValid.name = target?.validity?.valid || false;
            }}
          />
        </fieldset>
        <fieldset class="mb-4 flex items-center gap-5">
          <label class="w-[90px] text-right text-black" for="day">
            Day
          </label>
          <input
            type="number"
            min="1"
            max="31"
            class="inline-flex h-8 w-full flex-1 items-center justify-center rounded-sm border border-solid px-3 leading-none text-black"
            id="day"
            bind:value={form.day}
            required
            aria-required="true"
            oninput={(event: Event) => {
              const target = event.target as HTMLInputElement;
              formValid.day = target?.validity?.valid || false;
            }}
          />
        </fieldset>
        <fieldset class="mb-4 flex items-center gap-5">
          <label class="w-[90px] text-right text-black" for="month">
            Month
          </label>
          <input
            type="number"
            min="1"
            max="12"
            class="inline-flex h-8 w-full flex-1 items-center justify-center rounded-sm border border-solid px-3 leading-none text-black"
            id="month"
            bind:value={form.month}
            required
            aria-required="true"
            oninput={(event: Event) => {
              const target = event.target as HTMLInputElement;
              formValid.month = target?.validity?.valid || false;
            }}
          />
        </fieldset>
        <fieldset class="mb-4 flex items-center gap-5">
          <label class="w-[90px] text-right text-black" for="valueYes">
            valueYes
          </label>
          <input
            class="inline-flex h-8 w-full flex-1 items-center justify-center rounded-sm border border-solid px-3 leading-none text-black"
            id="valueYes"
            bind:value={form.valueYes}
          />
        </fieldset>
        <fieldset class="mb-4 flex items-center gap-5">
          <label class="w-[90px] text-right text-black" for="valueNo">
            valueNo
          </label>
          <input
            class="inline-flex h-8 w-full flex-1 items-center justify-center rounded-sm border border-solid px-3 leading-none text-black"
            id="valueNo"
            bind:value={form.valueNo}
          />
        </fieldset>

        <div class="mt-6 flex justify-end gap-4">
          <Button
            element={close}
            fullWidth={false}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            colour="primary"
            fullWidth={false}
            {disabled}
            onclick={() => {
              if (
                form.name !== ''
                && form.day !== ''
                && form.month !== ''
              ) {
                // console.log(`/?${generateSearchParams(form)}`);
                dates.addDate(form);
                // TODO: Navigate to new date
                goto(`/?${generateSearchParams(form)}`);

                $open = !$open;
              }
            }}
          >
            Save changes
          </Button>
        </div>
      </form>

    </div>
  </div>
{/if}
