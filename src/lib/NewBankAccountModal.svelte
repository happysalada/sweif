<script lang="ts">
  import { bankAccounts } from "$lib/stores";
  import { FiatCurrency } from "$lib/types";

  import { clickOutside } from "$lib/utils";

  export let showModal = false;
  let error = "";
  let name = "";
  let country = "";
  let bankName = "";
  let iban = "";
  let identificationNumber = "";
  let ownerName = "";
  let currency = FiatCurrency.EUR;
</script>

<div
  class="relative z-10"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
  <div
    class:hidden={!showModal}
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
  />

  <div class="fixed inset-0 z-10 overflow-y-auto" class:hidden={!showModal}>
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div
        class:hidden={!showModal}
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
        use:clickOutside
        on:outclick={() => (showModal = false)}
      >
        <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
          <button
            type="button"
            on:click={() => (showModal = false)}
            class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="sr-only">Close</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="sm:flex sm:items-start">
          <div
            class:hidden={error == ""}
            class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              class="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Create a new bank account
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Information to create the bank account
              </p>
            </div>

            <div class="mt-2">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Nombre de la cuenta</label
              >
              <div class="mt-2">
                <input
                  id="accountName"
                  name="accountName"
                  type="text"
                  autocomplete="accountName"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  bind:value={name}
                />
              </div>
            </div>

            <div class="mt-2">
              <label
                for="country"
                class="block text-sm font-medium leading-6 text-gray-900"
                >País</label
              >
              <div class="mt-2">
                <select
                  id="country"
                  name="country"
                  autocomplete="country"
                  bind:value={country}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="CO">Colombia</option>
                  <option value="ES">Spain</option>
                </select>
              </div>
            </div>

            <div class="mt-2">
              <label
                for="currency"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Currency</label
              >
              <div class="mt-2">
                <select
                  id="currency"
                  name="currency"
                  autocomplete="currency"
                  bind:value={currency}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {#each Object.values(FiatCurrency) as fiatCurrency}
                    <option>{fiatCurrency}</option>
                  {/each}
                </select>
              </div>
            </div>

            <div class="mt-2">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Nombre del Banco</label
              >
              <div class="mt-2">
                <input
                  id="bankName"
                  name="bankName"
                  type="text"
                  autocomplete="bankName"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  bind:value={bankName}
                />
              </div>
            </div>

            <div class="mt-2">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >IBAN</label
              >
              <div class="mt-2">
                <input
                  id="iban"
                  name="iban"
                  type="text"
                  autocomplete="iban"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  bind:value={iban}
                />
              </div>
            </div>

            <div class="mt-2">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Identificacion</label
              >
              <div class="mt-2">
                <input
                  id="idNumber"
                  name="idNumber"
                  type="text"
                  autocomplete="idNumber"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  bind:value={identificationNumber}
                />
              </div>
            </div>

            <div class="mt-2">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Nombre del titular de la cuenta</label
              >
              <div class="mt-2">
                <input
                  id="ownerName"
                  name="ownerName"
                  type="owner"
                  autocomplete="ownerName"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  bind:value={ownerName}
                />
              </div>
            </div>

            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                on:click={() => {
                  $bankAccounts = [...$bankAccounts, {name, country, bankName, iban, identificationNumber, ownerName, currency}];
                  showModal = false;
                }}
                class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >Create</button
              >
              <button
                type="button"
                on:click={() => (showModal = false)}
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >Cancel</button
              >
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
