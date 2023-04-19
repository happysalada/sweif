<script lang="ts">
  import { onMount } from "svelte";

  let loaded = false;
  onMount(async () => {
    loaded = true;
  });
  // TODO admin login stuff
</script>

<div class="bg-white">
  <slot />
</div>
