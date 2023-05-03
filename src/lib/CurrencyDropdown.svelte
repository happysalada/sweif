<script lang="ts">
  import { clickOutside } from "$lib/utils";
  import { FiatCurrency, StableCoin } from "$lib/types";
  export let currencies: Currency[];
  export let selected: Currency;
  import Cop from "./CurrencyDropdown/COP.svelte";
  import Eur from "./CurrencyDropdown/EUR.svelte";
  import EurC from "./CurrencyDropdown/EURC.svelte";

  export let inputAmount;
  export let outputAmount;
  let dropdownOpen = false;
</script>

<div
  class="flex items-center mr-3 w-full"
  use:clickOutside
  on:outclick={() => (dropdownOpen = false)}
>
  <div class="relative w-full">
    <button
      type="button"
      class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      on:click={() => (dropdownOpen = !dropdownOpen)}
    >
      <span class="flex items-center">
        {#if selected == FiatCurrency.COP}
          <Cop />
        {:else if selected == FiatCurrency.EUR}
          <Eur />
        {:else if selected == StableCoin.EURC}
          <EurC />
        {/if}
      </span>
      <span
        class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    <!--
        Select popover, show/hide based on select state.

        Entering: ""
          From: ""
          To: ""
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      -->
    <ul
      class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      class:hidden={!dropdownOpen}
      tabindex="-1"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
    >
      <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
        -->
      {#each currencies as currency}
        <li
          class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
          id="listbox-option-0"
          role="option"
          aria-selected={currency == selected}
          on:click={() => {
            selected = currency;
            dropdownOpen = false;
            inputAmount = 0;
            outputAmount = 0;
          }}
        >
          <div class="flex items-center">
            {#if currency == FiatCurrency.COP}
              <Cop />
            {:else if currency == FiatCurrency.EUR}
              <Eur />
            {:else if currency == StableCoin.EURC}
              <EurC />
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>
