<script lang="ts">
  import type { PageData } from "./$types";

  import { Decimal } from "decimal.js";
  import { superForm } from "sveltekit-superforms/client";
  import { onMount } from "svelte";

  import { StableCoin, FiatCurrency } from "$lib/types";
  import { currencyFormat } from "$lib/utils";
  import { user } from "$lib/stores";

  import Calculator from "$lib/Calculator.svelte";
  import TopupInstructions from "$lib/TopupInstructions.svelte";

  export let data: PageData;
  let inputCurrency = FiatCurrency.COP;
  let outputCurrency = StableCoin.EURC;

  enum State {
    Calculator,
    BankDetails,
    ConfirmTransferDetails,
    Success,
  }

  let state = State.Calculator;
  let banks: Bank[] = [];
  let currencies: CurrencyDb[] = [];
  onMount(async () => {
    let [{result: rawCurrencies}] = await data.banks;
    currencies = rawCurrencies;
  });

  const { form, errors, constraints, enhance } = superForm(data.form, {
    validators: {
      inputAmount: (input) =>
        input && input > 0 ? undefined : "please enter a positive input",
      inputCurrency: (input) => input ? undefined : "Please select an input currency",
      outputAmount: (input) =>
        input && input > 0 ? undefined : "please enter a positive output",
      outputCurrency: (input) => input ? undefined : "Please select an output currency",
      bankId: (input) => (input ? undefined : "Please choose your bank name"),
      accountLast4Digits: (input) =>
        input && input.length >= 4
          ? undefined
          : "please put the last 4 digits of your account number",
    },
    onError({ result, message }) {
      console.log(result);
      console.log(message);
    },
    applyAction: false,
    onResult({ result }) {
      if (result.type === "success" && result.data?.created) {
        state = State.Success;
      } else if (result.type === "failure") {
        console.log(result)
      }
    },
  });
  $: $form.inputCurrency = inputCurrency;
  $: banks = currencies.find(it => it.code == $form.inputCurrency)?.banks ?? [];
  $: $form.outputCurrency = outputCurrency;
  $: amountValid = !!(
    $form.inputAmount &&
    $form.inputAmount > 0 &&
    $form.outputAmount &&
    $form.outputAmount > 0 &&
    $form.inputCurrency &&
    $form.outputCurrency
  );
</script>

<div class="w-full flex flex-col justify-center items-center">
  {#if state == State.Calculator}
    <div class="px-4 py-6 sm:px-6">
      <TopupInstructions />
    </div>

    <Calculator
      fxRates={data.fxRates}
      bind:inputAmount={$form.inputAmount}
      bind:inputCurrency
      inputCurrencies={[FiatCurrency.COP]}
      bind:outputAmount={$form.outputAmount}
      bind:outputCurrency
      outputCurrencies={[StableCoin.EURC]}
      bind:fee={$form.fee}
      bind:realRate={$form.rate}
    />
    <button
      type="button"
      disabled={!amountValid}
      on:click={() => (state = State.BankDetails)}
      class="rounded-md {amountValid
        ? 'bg-primary-600'
        : 'bg-primary-300'} px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80"
      >Recargar</button
    >
  {:else if state == State.BankDetails}
    <div class="px-4 py-6 sm:px-6 max-w-md">
      <h2 class="text-base font-semibold leading-7 text-gray-900 mb-4">
        ¡¡Recargar tu billetera Sweif es muy fácil!!
      </h2>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Solo tienes que hacer una Transferencia Bancaria o una consignación con
        el monto indicado en "Monto a transferir" a la siguiente cuenta bancaria
        de Bitval Colombia SAS.
      </p>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500 mb-4">
        Una vez que el dinero ingrese a nuestra cuenta, verás reflejado tu saldo
        en tu billetera Sweif.
      </p>

      <div class="border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">
              Monto a Transferir
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {inputCurrency}
              {currencyFormat(new Decimal($form.inputAmount || 0), inputCurrency)}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900 text-right">
              Nombre de la sociedad
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              Bitval Colombia SAS
            </dd>
            <dt class="text-sm font-medium text-gray-900 text-right">
              Tipo de cuenta
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              Cuenta de ahorros Bancolombia
            </dd>
            <dt class="text-sm font-medium text-gray-900 text-right">NIT</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              901617634-7
            </dd>
            <dt class="text-sm font-medium text-gray-900 text-right">
              Número de cuenta
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              19300001303
            </dd>
          </div>

          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10 mt-12"
            >
              <svg
                class="h-6 w-6 text-orange-600"
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
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left py-8">
              <h3
                class="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                Attencion
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Ten en cuenta que last transferencias provenientes de otros
                  bancos que no sean Bancolombia pueden tardar 24 horas en
                  validarse
                </p>
              </div>
            </div>
          </div>

          <div class="px-4 py-6 sm:px-6">
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Cuando hayas hecho tu transferencia vuelve a esta pantalla y dale
              click en el botón de enviado, esto nos hará saber que tu
              transferencia ya está en camino y dará inicio a todo el proceso de
              Sweif
            </p>
          </div>

          <div class="px-4 py-6 flex justify-center">
            <button
              type="button"
              on:click={() => (state = State.ConfirmTransferDetails)}
              class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 w-72"
              >Enviado</button
            >
          </div>
        </dl>
      </div>
    </div>
  {:else if state == State.ConfirmTransferDetails}
    <form method="POST" class="px-4 py-6 sm:px-6 max-w-md" use:enhance>
      <input name="inputAmount" type="hidden" bind:value={$form.inputAmount} />
      <input
        name="outputAmount"
        type="hidden"
        bind:value={$form.outputAmount}
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

      <h3 class="text-base font-semibold leading-7 text-gray-900">
        Datos de tu cuenta
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
        Indica el nombre del banco desde el cual hiciste la transferencia y los
        últimos 4 dígitos de tu cuenta para poder verificar la proveniencia de
        la transacción.
      </p>

      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium leading-6 text-gray-900">
          Nombre de tu banco
        </dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <div class="flex justify-start gap-8">
            <div class="sm:col-span-2">
              <label for="bankId" class="sr-only">Bank name</label>
              <div>
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
          </div>
        </dd>

        <dt class="text-sm font-medium leading-6 text-gray-900">
          Últimos cuatro digitos de tu cuenta
        </dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <div class="flex justify-start gap-8">
            <div class="sm:col-span-2">
              <label for="accountLast4Digits" class="sr-only"
                >Account last 4 digits</label
              >
              <div>
                <input
                  type="text"
                  name="accountLast4Digits"
                  id="accountLast4Digits"
                  class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.accountLast4Digits
								? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
								: 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  aria-invalid={$errors.accountLast4Digits != undefined}
                  aria-describedby={$errors.accountLast4Digits != undefined
                    ? "account-last-4-digits-error"
                    : ""}
                  data-invalid={$errors.accountLast4Digits}
                  bind:value={$form.accountLast4Digits}
                  {...$constraints.accountLast4Digits}
                />
                {#if $errors.accountLast4Digits}
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
              {#if $errors.accountLast4Digits}
                <p
                  class="mt-2 text-sm text-red-600"
                  id="account-last-4-digits-error"
                >
                  {$errors.accountLast4Digits}
                </p>
              {/if}
            </div>
          </div>
        </dd>
      </div>

      <div class="px-4 py-6 flex justify-center">
        <button
          class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 w-72"
          >Confirmo</button
        >
      </div>
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
            Recarga en proceso
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
