<script lang="ts">
  import { page } from '$app/stores';
  import AddDate from '$lib/components/AddDate.svelte';
</script>

<svelte:head>
  <title>{$page.status}: {$page.error?.message}</title>
</svelte:head>

<div class="space-y-4">
  <p class="text-center">{$page.error?.message}</p>

  <p>Create a new one below:</p>

  <AddDate />
</div>
