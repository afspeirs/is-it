<script lang="ts" context="module">
  import type { CreateToasterProps } from '@melt-ui/svelte';

  type ToastData = {
    title: string;
    description?: string;
    button?: {
      title: string;
      onclick: () => void;
    }
  };
  type ToastAdd = ToastData & Omit<CreateToasterProps, 'hover'>;

  const {
    elements: { content, title, description, close },
    helpers,
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>();

  export const toast = {
    add: ({ title, description, button, ...options }: ToastAdd) => helpers.addToast({
      data: {
        title,
        description,
        button,
      },
      ...options,
    }),
    remove: helpers.removeToast,
    update: helpers.updateToast,
  };
</script>

<script lang="ts">
  import { createToaster, melt } from '@melt-ui/svelte';
  import { XIcon } from 'lucide-svelte';
  import { flip } from 'svelte/animate';
  import { fly } from 'svelte/transition';
</script>

<div class="fixed right-0 bottom-0 flex flex-col items-end gap-2 m-4 z-[99999] select-none" use:portal>
  {#each $toasts as { id, data } (id)}
    <div
      animate:flip={{ duration: 500 }}
      in:fly={{ duration: 150, x: '100%' }}
      out:fly={{ duration: 150, x: '100%' }}
      class="rounded-lg bg-dark dark:bg-white text-white dark:text-dark shadow-md"
      use:melt={$content(id)}
    >
      <div class="relative min-w-36 max-w-[calc(100vw-2rem)] p-2">
        <div class="flex gap-2 font-semibold">
          <h3
            class="flex items-center gap-2 px-2"
            use:melt={$title(id)}
          >
            {data.title}
          </h3>
          {#if data.button}
            <button
              class="p-2 rounded-md text-dark dark:text-white bg-white dark:bg-dark hover:bg-white/80 dark:hover:bg-dark/80"
              onclick={data.button.onclick}
              use:melt={$close(id)}
            >
              <span>{data.button.title}</span>
            </button>
          {/if}
          <button
            class="p-2 rounded-md text-white dark:text-dark hover:bg-white/10 dark:hover:bg-black/10"
            use:melt={$close(id)}
          >
            <XIcon class="size-6" aria-hidden="true" />
            <span class="sr-only">Close notification</span>
          </button>
        </div>
        {#if data.description}
          <div use:melt={$description(id)}>
            {data.description}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
