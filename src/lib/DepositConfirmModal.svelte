<script lang="ts">
  import { Decimal } from "decimal.js";
	import { goto } from "$app/navigation";

  import { clickOutside } from "$lib/utils";
  import { BANKS } from "$lib/constants";
  import { balances, user, transactions } from "$lib/stores";

  export let showModal = false;
  export let inputAmount: number;
  export let inputCurrency: Currency;
  export let outputAmount: number;
  export let outputCurrency: Currency;

  enum State {
    Transfer,
    ConfirmDetails,
  }

	let state = State.Transfer;
  let error = "";
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
        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
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

          <div class="">
            <div class="px-4 py-6 sm:px-6">
              <h3 class="text-base font-semibold leading-7 text-gray-900">
                Transferencia Bancaria
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Para recargar tu billetera sweif envia una transferencia bancaria a la cuenta Bancolombia de Bitva Colombia SAS y completa los espacios inferiores. Una vez que el dinero ingrese a la cuenta se vera reflejado en tu cuenta sweif.
              </p>
            </div>
            <div class="border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                {#if state == State.Transfer}
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-900">Transfiere</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {inputAmount} {inputCurrency}
                  </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-900">Descripción</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Por favor consignar el valor a recargar en la siguiente cuenta bancaria. Una vez hecha la transacción, por favor ingresar en el siguiente recuadro los últimos 4 digitos de tu número de cuenta y seleccionar el nombre del banco desde donde hiciste la transacción.
                  </dd>
                  <dt class="text-sm font-medium text-gray-900 text-right">NIT</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    901617634-7
                  </dd>
                  <dt class="text-sm font-medium text-gray-900 text-right">Número de cuenta</dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    19300001303
                  </dd>
                </div>


                <div class="px-4 py-6 flex justify-center">
                  <button
                    type="button"
                    on:click={() => (state = State.ConfirmDetails)}
                    class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 w-72"
                    >Enviado</button
                  >
                </div>
                {:else if state == State.ConfirmDetails}
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Nombre de tu banco
                  </dt>
                  <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div class="flex justify-start gap-8">
                      <div class="sm:col-span-2">
                        <label for="bankAccount" class="sr-only">Bank account</label>
                        <div>
                          <select
                            id="bankAccount"
                            name="bankAccount"
                            autocomplete="bankAccount"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            {#each BANKS as bank}
                              <option> {bank}</option>
                            {/each}
                          </select>
                        </div>
                      </div>

                    </div>
                  </dd>

                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Últimos cuatro digitos de tu cuenta
                  </dt>
                  <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div class="flex justify-start gap-8">
                      <div class="sm:col-span-2">
                        <label for="bankAccount" class="sr-only">Bank account</label>
                        <div>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                    </div>
                  </dd>
                </div>

                <div class="px-4 py-6 flex justify-center">
                  <button
                    type="button"
                    on:click={() => {
                      let amount = new Decimal(outputAmount || 0);
                      if (amount.isZero()) return;
                      $balances[outputCurrency] = $balances[outputCurrency].add(amount)
                      showModal = false;
                      $transactions = [...$transactions, {type: "deposit", inputAmount, inputCurrency, outputAmount, outputCurrency, at: new Date()}]
                      inputAmount = 0;
                      outputAmount = 0;
                      goto(`/${$user?.email || 'nico'}/dashboard`);
                    }}
                    class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 w-72"
                    >Confirmo</button
                  >
                </div>

                {/if}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
