<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Toaster from '$lib/components/Toaster.svelte';

  let { children } = $props();
</script>

<div class="flex flex-col h-dvh">
  <Header />

  <main class="relative grid place-items-center flex-1">
    <div>
      {@render children()}
    </div>
  </main>
</div>

<Toaster />
