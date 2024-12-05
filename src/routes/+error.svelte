<script lang="ts">
  import { page } from '$app/stores';
  import { Plus } from 'lucide-svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>{$page.status}: {$page.error?.message}</title>
</svelte:head>

<div class="space-y-4">
  <p class="text-center">{$page.error?.message}</p>

  <p>Create a new one below:</p>

  <!-- TODO: Make this functional -->
  <Button
    icon={Plus}
    colour="primary"
  >
    Create a new date
  </Button>
</div>
