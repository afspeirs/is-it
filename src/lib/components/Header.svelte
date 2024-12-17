<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Button.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { toast } from '$lib/components/Toaster.svelte';
  import { dates } from '$lib/context/dates.svelte';
  import { Share2Icon as ShareIcon } from 'lucide-svelte';
  // $inspect(date);

  const title = $derived(`Is it ${dates.current?.name || '...'}?`);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header class="relative flex gap-1 p-2">
  <Sidebar />

  <span class="ml-2 self-center font-bold text-xl truncate select-none">{title}</span>

  <span class="ml-auto"></span>

  {#if dates.current?.name}
    <Button
      icon={ShareIcon}
      iconOnly
      colour="primary"
      onclick={async () => {
        const url = $page.url.href;
        const title = `Is it ${dates.current?.name}`;

        try {
          if (navigator.share) {
            await navigator.share({ title, url });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(url)
              .then(() => {
                toast.add({
                  title: `Copied shareable link to "Is it ${dates.current?.name}"}`,
                });
              });
          }
        } catch (error) {
          console.error(error); // eslint-disable-line no-console
        }
      }}
    >
      Share "Is it {dates.current.name}"
    </Button>
  {/if}
</header>
