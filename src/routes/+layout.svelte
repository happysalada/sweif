<script lang="ts">
  import "../app.postcss";
  import HeartLoader from '$lib/HeartLoader.svelte';
  import { onMount } from "svelte";

  let loaded = false;
  onMount(async () => {
    loaded = true;
  });
</script>

{#if !loaded}
  <HeartLoader />
{:else}
  <main class="h-full">
    <slot />
  </main>
{/if}
