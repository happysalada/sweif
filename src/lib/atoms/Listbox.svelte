<script lang="ts">
  import { createListbox } from "svelte-headlessui";
  import Transition from "svelte-transition";

  export let list: any[];
  export let selected: any;
  export let label: string;
  export let displayProperty: string;
  export let onSelect: (event: any) => void

  const listbox = createListbox({
    label,
    selected,
  });

</script>

<div class="flex w-full flex-col items-center justify-center">
  <div class="w-full">
  	<label
  		for="undefined"
  		class="block text-sm font-medium leading-6 text-gray-900">{label}</label
  	>
    <div class="relative mt-1">
      <button
        use:listbox.button
        on:select={() => onSelect($listbox.active)}
        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm"
      >
        <span class="block truncate">{$listbox.selected[displayProperty]}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          	<path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </span>
      </button>

      <Transition
        show={$listbox.expanded}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul
          use:listbox.items
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
        >
          {#each list as value}
            {@const active = $listbox.active === value}
            {@const selected = $listbox.selected === value}
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4 {active
                ? 'bg-primary-100 text-primary-900'
                : 'text-gray-900'}"
              use:listbox.item={{ value }}
            >
              <span
                class="block truncate {selected
                  ? 'font-medium'
                  : 'font-normal'}">{value[displayProperty]}</span
              >
              {#if selected}
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              {/if}
            </li>
          {/each}
        </ul>
      </Transition>
    </div>
  </div>
</div>
