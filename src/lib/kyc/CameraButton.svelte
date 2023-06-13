<script lang="ts">
  export let disabled: boolean
</script>

<button on:click aria-label="take picture" class="w-20 h-20 rounded-full border-4 border-white flex justify-center items-center bg-transparent outline-none cursor-pointer z-20 disabled:opacity-50 disabled:cursor-not-allowed mt-8" {disabled}>
  <span class="w-16 h-16 min-w-16 bg-white rounded-full" />
</button>
