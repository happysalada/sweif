<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";

  import { clickOutside } from "$lib/utils";

  export let showModal = false;
  let error = "";
  export let formData;
  export let bankAccounts: BankAccount[];
  export let currency: string;
  export let selectedBankAccount: BankAccount | undefined;
  export let bankAccountId: string;
  export let countries: Country[] = [];
  let banks: Bank[] = [];
  let currencies: CurrencyDb[] = [];
  let identificationTypes: IdentificationType[] = [];

  const { form, errors, constraints, enhance } = superForm(formData, {
    validators: {
      name: (input) => input ? undefined : "please enter a name for the bank account",
      country: (input) => (input ? undefined : "Please choose the country for your bank"),
      bankId: (input) => (input ? undefined : "Please choose your bank"),
      currency: (input) => (input ? undefined : "Please choose your currency"),
      iban: (input) => (input ? undefined : "Please enter an iban or account number"),
      identificationType: (input) => (input ? undefined : "Please choose your identification type"),
      identificationNumber: (input) => (input ? undefined : "Please enter your identification number"),
      ownerName: (input) => (input ? undefined : "Please enter the full name of the account owner"),
    },
    onError({ result, message }) {
      console.log(result);
      console.log(message);
    },
    resetForm: true,
    onResult({ result, formEl }) {
      if (result.type === "success" && result.data?.created?.[0]?.result?.[0]) {
        showModal = false;
        bankAccounts = [...bankAccounts, result.data.created[0].result[0]];
        if (bankAccounts.length == 1) {
          selectedBankAccount = bankAccounts[0];
          bankAccountId = selectedBankAccount.id
        }
        formEl.reset()
      } else if (result.type === "failure") {
        console.log(result);
      }
    },
  });
  $: currency = $form.currency;
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
          <form
            method="POST"
            action="?/createBankAccount"
            use:enhance
            class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
          >
            <h3
              class="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Crea una nueva cuenta
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Digita la siguiente información para registrar una nueva cuenta
              </p>
            </div>

            <div class="mt-2">
              <label
                for="name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Nombre personalizado</label
              >
              <div class="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.name
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.name != undefined}
                  aria-describedby={$errors.name != undefined
                    ? "name-error"
                    : ""}
                  data-invalid={$errors.name}
                  bind:value={$form.name}
                  {...$constraints.name}
                />
                {#if $errors.name}
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      class="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                {/if}
              </div>
              {#if $errors.name}
                <p class="mt-2 text-sm text-red-600" id="name-error">
                  {$errors.name}
                </p>
              {/if}
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
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.country
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.country != undefined}
                  aria-describedby={$errors.country != undefined
                    ? "country-error"
                    : ""}
                  data-invalid={$errors.country}
                  bind:value={$form.country}
                  {...$constraints.country}
                  on:change={(event) => {
                    let country = countries.find(({ id }) => id == event?.target?.value);
                    banks = country?.banks ?? [];
                    currencies = country?.currencies ?? [];
                    identificationTypes = country?.identification_types ?? [];
                  }}
                >
                  {#each countries as {id, name}}
                    <option value={id}>{name}</option>
                  {/each}
                </select>
              </div>
              {#if $errors.country}
                <p class="mt-2 text-sm text-red-600" id="country-error">
                  {$errors.country}
                </p>
              {/if}
            </div>

            <div class="mt-2">
              <label
                for="currency"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Divisa</label
              >
              <div class="mt-2">
                <select
                  id="currency"
                  name="currency"
                  autocomplete="currency"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.currency
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-describedby={$errors.currency != undefined
                    ? "currency-error"
                    : ""}
                  data-invalid={$errors.currency}
                  bind:value={$form.currency}
                  {...$constraints.currency}
                >
                  {#each currencies as {id, code}}
                    <option value={id}>{code}</option>
                  {/each}
                </select>
              </div>
              {#if $errors.currency}
                <p class="mt-2 text-sm text-red-600" id="currency-error">
                  {$errors.currency}
                </p>
              {/if}
            </div>

            <div class="mt-2">
              <label
                for="bankId"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Nombre del Banco</label
              >
              <div class="mt-2">
                <select
                  id="bankId"
                  name="bankId"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.bankId
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.bankId != undefined}
                  aria-describedby={$errors.bankId != undefined
                    ? "bank-id-error"
                    : ""}
                  data-invalid={$errors.bankId}
                  bind:value={$form.bankId}
                  {...$constraints.bankId}
                >
                  {#each banks as {id, name}}
                    <option value={id}>{name}</option>
                  {/each}
                </select>
              </div>
              {#if $errors.bankId}
                <p class="mt-2 text-sm text-red-600" id="bank-id-error">
                  {$errors.bankId}
                </p>
              {/if}
            </div>

            <div class="mt-2">
              <label
                for="iban"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Número de cuenta, IBAN para cuenta en España</label
              >
              <div class="mt-2">
                <input
                  id="iban"
                  name="iban"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.iban
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.iban != undefined}
                  aria-describedby={$errors.iban != undefined
                    ? "iban-error"
                    : ""}
                  data-invalid={$errors.iban}
                  bind:value={$form.iban}
                  {...$constraints.iban}
                />
                {#if $errors.iban}
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      class="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                {/if}
              </div>
              {#if $errors.iban}
                <p class="mt-2 text-sm text-red-600" id="bank-id-error">
                  {$errors.iban}
                </p>
              {/if}
            </div>

            <div class="mt-2">
              <label
                for="identificationType"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Tipo de Identificación</label
              >
              <div class="mt-2">
                <select
                  id="identificationType"
                  name="identificationType"
                  autocomplete="identificationType"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.identificationType
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.identificationType != undefined}
                  aria-describedby={$errors.identificationType != undefined
                    ? "identification-type-error"
                    : ""}
                  data-invalid={$errors.identificationType}
                  bind:value={$form.identificationType}
                  {...$constraints.identificationType}
                >
                  {#each identificationTypes as {id, name}}
                    <option value={id}>{name}</option>
                  {/each}
                </select>
              </div>
              {#if $errors.identificationType}
                <p class="mt-2 text-sm text-red-600" id="identification-type-error">
                  {$errors.identificationType}
                </p>
              {/if}
            </div>

            <div class="mt-2">
              <label
                for="identificationNumber"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Número de identificación</label
              >
              <div class="mt-2">
                <input
                  id="identificationNumber"
                  name="identificationNumber"
                  type="text"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.identificationNumber
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.identificationNumber != undefined}
                  aria-describedby={$errors.identificationNumber != undefined
                    ? "identification-type-error"
                    : ""}
                  data-invalid={$errors.identificationNumber}
                  bind:value={$form.identificationNumber}
                  {...$constraints.identificationNumber}
                />
                {#if $errors.identificationNumber}
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      class="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                {/if}
              </div>
              {#if $errors.identificationNumber}
                <p class="mt-2 text-sm text-red-600" id="identification-type-error">
                  {$errors.identificationNumber}
                </p>
              {/if}
            </div>

            <div class="mt-2">
              <label
                for="ownerName"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Nombre del titular de la cuenta</label
              >
              <div class="mt-2">
                <input
                  id="ownerName"
                  name="ownerName"
                  type="owner"
                  required
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.ownerName
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.ownerName != undefined}
                  aria-describedby={$errors.ownerName != undefined
                    ? "owner-name-error"
                    : ""}
                  data-invalid={$errors.ownerName}
                  bind:value={$form.ownerName}
                  {...$constraints.ownerName}
                />
              </div>
              {#if $errors.ownerName}
                <p class="mt-2 text-sm text-red-600" id="owner-name-error">
                  {$errors.ownerName}
                </p>
              {/if}
            </div>

            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 sm:ml-3 sm:w-auto"
                >Crear</button
              >
              <button
                type="button"
                on:click={() => (showModal = false)}
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >Cancelar</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
