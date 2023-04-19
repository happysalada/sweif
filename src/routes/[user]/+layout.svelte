<script lang="ts">
  import { onMount } from "svelte";

  let loaded = false;
  onMount(async () => {
    loaded = true;
  });
  // TODO user login stuff
</script>

<slot />
