<script lang="ts">
  import BackButton from "$lib/kyc/BackButton.svelte";
  import DocumentPhoto from "$lib/kyc/DocumentPhoto.svelte";
  import type { OverlayType } from "$lib/kyc/types";

  export let title: string;
  export let paragraph: string;
  export let overlayType: OverlayType;
  export let onSubmit: (dataUri: string) => void;

  let submitted = false;
  let dataUri = "";
</script>

{#if !submitted}
  <DocumentPhoto
    bind:dataUri
    bind:submitted
    {title}
    {paragraph}
    {overlayType}
  />
{:else}
  <div class="flex justify-center p-8 sm:p-16 bg-gray-900 h-screen">
    <div
      class="text-center flex h-full w-full justify-center items-center flex-col max-w-lg"
    >
      <BackButton on:click={() => (submitted = false)} />
      <div class="text-center flex flex-col justify-center items-center">
        <h2 class="text-white z-10 font-bold text-lg mb-4">Review picture</h2>
        <p class="text-gray-200 z-10 mb-8">
          Make sure the information is seen clearly, with no blur or glare.
        </p>
        <div class="flex justify-center items-center w-full">
          <img
            class="rounded-xl m-0 max-w-full max-h-35vh h-auto"
            src={dataUri}
            alt="result"
          />
        </div>
      </div>
      <button
        class="cursor-pointer border-none outline-none px-5 py-4 text-base font-semibold w-full text-white rounded-full shadow-md mt-12 bg-primary-400"
        on:click={() => onSubmit(dataUri)}
      >
        This looks good
      </button>
    </div>
  </div>
{/if}
