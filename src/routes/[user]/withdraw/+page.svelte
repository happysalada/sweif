<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { Decimal } from "decimal.js";
  import { onMount } from "svelte";

  import type { PageData } from "./$types";

  import { StableCoin } from "$lib/types";
  import { balances, user } from "$lib/stores";

  import NewBankAccountModal from "$lib/NewBankAccountModal.svelte";
  import Calculator from "$lib/Calculator.svelte";

  let selectedBankAccount: BankAccount | undefined;

  enum State {
    SelectBankAccount,
    EnterAmount,
    Success,
  }

  let state = State.SelectBankAccount;
  let inputCurrencies: Currency[];
  export let data: PageData;
  let showModal = false;
  let bankAccounts: BankAccount[] = [];
  let countries: Country[] = [];
  onMount(async () => {
    let [{ result: rawBankAccounts }, {result: rawCountries}] = await data.databaseResults;
    bankAccounts = rawBankAccounts;
    countries = rawCountries;
    showModal = bankAccounts.length == 0;
  });

  const { form, enhance, errors } = superForm(data.withdrawalRequestForm, {
    validators: {
      inputAmount: (input) =>
        input && input > 0 && maxBalance.gte(input)
          ? undefined
          : "please enter a positive amount less than your balance",
      inputCurrency: (input) =>
        input ? undefined : "Please select an input currency",
      outputAmount: (input) =>
        input && input > 0 ? undefined : "please enter a positive output",
      outputCurrency: (input) =>
        input ? undefined : "Please select an output currency",
      bankAccountId: (input) =>
        input ? undefined : "Please choose your bank account",
    },
    onError({ result, message }) {
      console.log(result);
      console.log(message);
    },
    resetForm: true,
    onResult({ result }) {
      if (result.type === "success" && result.data?.created) {
        state = State.Success;
      } else if (result.type === "failure") {
        console.log(result);
      }
    },
  });
  let maxBalance = new Decimal(0);
  $: maxBalance = $balances[$form.inputCurrency] || new Decimal(0);
  balances.subscribe(($balances) => {
    inputCurrencies = Object.entries($balances)
      .filter(([_currency, balance]) => !balance.isZero())
      .map(([currency, _balance]) => currency);
    $form.inputCurrency = inputCurrencies[0] || StableCoin.EURC;
  });
  $: amountValid = !!(
    $form.inputAmount &&
    $form.inputAmount > 0 &&
    maxBalance.gte($form.inputAmount) &&
    $form.outputAmount &&
    $form.outputAmount > 0 &&
    $form.inputCurrency &&
    $form.outputCurrency &&
    $form.bankAccountId
  );
</script>

<NewBankAccountModal
  bind:showModal
  formData={data.bankAccountForm}
  bind:bankAccounts
  bind:currency={$form.outputCurrency}
  bind:bankAccountId={$form.bankAccountId}
  bind:selectedBankAccount
  bind:countries={countries}
/>

<div class="w-full flex flex-col justify-center items-center">
  {#if state == State.SelectBankAccount}
    <div class="overflow-hidden bg-white shadow sm:rounded-lg m-12">
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          Envia en una cuenta bancaria
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Puede ser tu cuenta o la de alguien más
        </p>
      </div>
      <div class="border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Selecciona la cuenta bancaria donde quieres transferir
            </dt>
            <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div class="flex justify-start gap-8">
                <div class="sm:col-span-2">
                  <label for="bankAccount" class="sr-only"
                    >Cuenta Bancaria</label
                  >
                  <div>
                    <select
                      id="bankAccountName"
                      name="bankAccountName"
                      autocomplete="bankAccountName"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      bind:value={$form.bankAccountId}
                      on:change={(event) => {
                        selectedBankAccount = bankAccounts.find(({ id }) => id == event?.target?.value)
                        $form.outputCurrency = selectedBankAccount?.currency.code
                      }}
                    >
                      {#each bankAccounts as { id, name }}
                        <option
                          value={id}
                        >{name}</option>
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
              disabled={!$form.bankAccountId}
              on:click={() => (state = State.EnterAmount)}
              class="rounded-md {$form.bankAccountId
                ? 'bg-primary-600'
                : 'bg-primary-300'} py-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 w-72 block"
              >Siguiente</button
            >
          </div>
        </dl>
      </div>
    </div>
  {:else if state == State.EnterAmount}
    <form
      method="POST"
      use:enhance
      action="?/createWithdrawalRequest"
      class="w-full flex flex-col justify-center items-center"
    >
      <div class="px-4 py-6 sm:px-6">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          Ingresar el monto a enviar
        </h3>
        {#each Object.entries($errors).filter(([_, error]) => !!error) as [element, error]}
          <p class="leading-7 text-red-500 max-w-sm">
            {element}
            {error}
          </p>
        {/each}
      </div>

      <input
        name="bankAccountId"
        type="hidden"
        bind:value={$form.bankAccountId}
      />
      <input
        name="inputCurrency"
        type="hidden"
        bind:value={$form.inputCurrency}
      />
      <input
        name="outputCurrency"
        type="hidden"
        bind:value={$form.outputCurrency}
      />
      <input
        name="fee"
        type="hidden"
        bind:value={$form.fee}
      />
      <input
        name="rate"
        type="hidden"
        bind:value={$form.rate}
      />

      <Calculator
        fxRates={data.fxRates}
        inputText={"Monto a enviar"}
        bind:inputAmount={$form.inputAmount}
        bind:inputCurrency={$form.inputCurrency}
        {inputCurrencies}
        bind:outputAmount={$form.outputAmount}
        outputText={`${selectedBankAccount?.name} recibe en cuenta bancaria`}
        bind:outputCurrency={$form.outputCurrency}
        outputCurrencies={[$form.outputCurrency]}
        bind:fee={$form.fee}
        bind:realRate={$form.rate}
      />
      <button
        disabled={!amountValid}
        class="rounded-md {amountValid
          ? 'bg-primary-600'
          : 'bg-primary-300'} px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80"
        >Enviar</button
      >
    </form>
  {:else if state == State.Success}
    <div class="px-4 py-6 sm:px-6 max-w-md">
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
            Envia en proceso
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Esperando a que llegue el dinero a la cuenta y te enviaremos una
              notificación una vez lo hayamos recibido
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-6">
        <a
          href={`/${$user?.email}/dashboard`}
          class="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >Volver al menú principal</a
        >
      </div>
    </div>
  {/if}
</div>
