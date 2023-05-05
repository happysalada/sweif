<script lang="ts">
	import { goto } from "$app/navigation";

  import { FiatCurrency, StableCoin } from "$lib/types";
  import { bankAccounts, balances, user, transactions } from "$lib/stores";
  import type { PageData } from "./$types";

  import UserNav from "$lib/UserNav.svelte";
  import NewBankAccountModal from "$lib/NewBankAccountModal.svelte";
  import Calculator from "$lib/Calculator.svelte";

  let showModal = false;
  bankAccounts.subscribe(($bankAccounts) =>
    $bankAccounts.length == 0 ? (showModal = true) : (showModal = false)
  );
  let selectedBankAccountName: string;
  $: selectedBankAccount = $bankAccounts.find( ({ name }) => name == selectedBankAccountName );
  $: outputCurrency = selectedBankAccount?.currency || FiatCurrency.EUR;

  enum State {
    SelectBankAccount,
    EnterAmount,
  }

  let state = State.SelectBankAccount;
  let inputAmount = 0;
  $: inputCurrencies = Object.entries($balances)
        .filter(([_currency, balance]) => !balance.isZero())
        .map(([currency, _balance]) => currency)
  $: inputCurrency = inputCurrencies[0] || StableCoin.EURC;
  let outputAmount = 0;
  export let data: PageData;
</script>

<NewBankAccountModal bind:showModal />

<UserNav />

{#if state == State.SelectBankAccount}
  <div class="overflow-hidden bg-white shadow sm:rounded-lg m-12">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        Bank details
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Registra una cuenta o selecciona una ya registrada:
      </p>
    </div>
    <div class="border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Cuenta Bancaria
          </dt>
          <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <div class="flex justify-start gap-8">
              <div class="sm:col-span-2">
                <label for="bankAccount" class="sr-only">Cuenta Bancaria</label>
                <div>
                  <select
                    id="bankAccountName"
                    name="bankAccountName"
                    autocomplete="bankAccountName"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    bind:value={selectedBankAccountName}
                  >
                    {#each $bankAccounts as { name }}
                      <option>{name}</option>
                    {/each}
                  </select>
                </div>
              </div>

              <button
                type="button"
                on:click={() => (showModal = true)}
                class="rounded-md bg-primary-600 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >Registra una cuenta nueva</button
              >
            </div>
          </dd>
        </div>

        <div class="px-4 py-6 flex justify-center w-full">
          <button
            type="button"
            on:click={() => (state = State.EnterAmount)}
            class="rounded-md bg-primary-600 py-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 w-72 block"
            >Next</button
          >
        </div>
      </dl>
    </div>
  </div>
{:else if state == State.EnterAmount}
  <div class="w-full flex flex-col justify-center items-center">
    <Calculator
      fxRates={data.fxRates}
      allFees={data.feeTable}
      bind:inputAmount
      bind:inputCurrency
      {inputCurrencies}
      bind:outputAmount
      {outputCurrency}
      outputCurrencies={[outputCurrency]}
      disclaimer={false}
    />
    <button
      type="button"
      disabled={inputAmount == 0 || inputAmount == "" || $balances[inputCurrency].lt(inputAmount)}
      on:click={() => {
        // amount being zero or more than balance is taken care of by the disabled property
        $balances[inputCurrency] = $balances[inputCurrency].minus(inputAmount);

        $transactions = [...$transactions, {type: "withdrawal", inputAmount, inputCurrency, outputAmount, outputCurrency, at: new Date()}]

        goto(`/${$user?.email || 'nico'}/dashboard`);
      }}
      class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80"
      >Retirar</button
    >
  </div>
{/if}
