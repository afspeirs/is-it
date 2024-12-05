<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { currentDate } from '$lib/context/dates.svelte';
  // $inspect({ $currentDate });
</script>

<header class="relative flex gap-1 p-2">
  <Sidebar />

  <span class="ml-2 self-center font-bold text-xl truncate select-none">Is it {$currentDate?.name || '...'}?</span>
</header>
