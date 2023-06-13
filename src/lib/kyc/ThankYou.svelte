<script lang="ts">
  import CenteredCard from "$lib/atoms/CenteredCard.svelte";
</script>

<CenteredCard>
  <div slot="main" class="px-4 py-6 sm:px-6 max-w-md">
    <div>
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
      >
        <svg
          class="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3
          class="text-base font-semibold leading-6 text-gray-900"
          id="modal-title"
        >
          KYC documents received
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            We will notify you once we have verified your documents.
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:mt-6" />
  </div>
</CenteredCard>
