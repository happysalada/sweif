<script lang="ts">
  import { Decimal } from "decimal.js";

  import { FxDirection, StableCoin, FiatCurrency } from "$lib/types";
  import { currencyFormat } from "$lib/utils";
  import { feeRate } from "$lib/fx";

  import CurrencyInput from "@canutin/svelte-currency-input";

  import CurrencyDropdown from "$lib/CurrencyDropdown.svelte";

  export let fxRates: RawFxRates;
  export let inputAmount: number | undefined;
  export let inputCurrencies: Currency[];
  export let inputText = "Monto a recargar";
  export let inputCurrency: Currency;
  export let outputAmount = 0;
  export let outputCurrency: Currency;
  export let outputCurrencies: Currency[];
  export let outputText = "Recibes";
  export let fee = 0;
  export let realRate = 1;
  $: fxRate = getFxRate(inputCurrency, outputCurrency);
  $: realRate = (fxRate.direction == FxDirection.Multiply) ? fxRate.value.toNumber() : new Decimal(1).div(fxRate.value).toNumber()

  function getFxRate(
    inputCurrency: Currency,
    outputCurrency: Currency
  ): FxRate {
    let rate = fxRates?.[`${inputCurrency}-${outputCurrency}`];
    let direction = FxDirection.Multiply;
    if (!rate) {
      rate = fxRates?.[`${outputCurrency}-${inputCurrency}`];
      direction = FxDirection.Divide;
    }
    if (!rate) {
      rate = 1.0;
      direction = FxDirection.Multiply;
    }
    return {
      value: new Decimal(rate),
      direction,
    };
  }

  function modifyInput(inputAmount: number) {
    // somehow an empty field gives a value of empty string.
    let inputAmountDec = new Decimal(inputAmount || 0);
    let rate = feeRate(inputAmountDec, inputCurrency);
    let feeDec = inputAmountDec.mul(rate);
    fee = feeDec.toDecimalPlaces(2).toNumber();
    let preConversion = inputAmountDec.minus(feeDec);
    outputAmount =
      fxRate.direction == FxDirection.Multiply
        ? preConversion.mul(fxRate.value).toDecimalPlaces(2).toNumber()
        : preConversion.div(fxRate.value).toDecimalPlaces(2).toNumber();
  }

  function modifyOutput(outputAmount: number) {
    // somehow an empty field gives a value of empty string.
    let outputAmountDec = new Decimal(outputAmount || 0);
    let preConversion =
      fxRate.direction == FxDirection.Multiply
        ? outputAmountDec.div(fxRate.value)
        : outputAmountDec.mul(fxRate.value);
    let initialRate = feeRate(preConversion, inputCurrency);
    let initialInputAmount = preConversion.div(
      new Decimal(1).minus(initialRate)
    );
    let finalRate = feeRate(initialInputAmount, inputCurrency);
    let finalInputAmount = preConversion.div(
      new Decimal(1).minus(finalRate)
    );
    inputAmount = finalInputAmount.toDecimalPlaces(2).toNumber();
    fee = finalInputAmount
      .mul(finalRate)
      .toDecimalPlaces(2)
      .toNumber();
  }
</script>

<div class="max-w-xs mt-6">
  <h2 class="sr-only">Summary</h2>
  <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
    <dl class="flex flex-wrap">
      <div class="px-6 pt-6 w-full">
        <label
          for="account-number"
          class="block text-sm font-medium leading-6 text-gray-900"
          >{inputText}</label
        >
        <div class="mt-2 rounded-md shadow-sm flex justify-between">
          <CurrencyInput
            name="inputAmount"
            inputClasses={{
              formatted: "rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-24 sm:w-36",
              formattedPositive: '',
            }}
            currency={inputCurrency == StableCoin.EURC || inputCurrency == FiatCurrency.EUR ? "EUR" : "USD"}
            bind:value={inputAmount}
            onValueChange={modifyInput}
          />
          <CurrencyDropdown
            currencies={inputCurrencies}
            bind:selected={inputCurrency}
            bind:inputAmount
            bind:outputAmount
          />
        </div>
      </div>

      {#if fee != 0}
        <div
          class="mt-6 flex w-full flex-wrap border-t border-gray-900/5 px-6 pt-6 justify-between"
        >
          <dd class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-5 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="pl-4 text-sm text-gray-500 leading-6">
              {currencyFormat(new Decimal(fee), inputCurrency)} {inputCurrency}
            </p>
          </dd>
          <dt class="text-sm text-gray-500 leading-6">Costo de envío</dt>
        </div>
      {/if}
      <div class="mt-4 flex w-full px-6 justify-between">
        <dt class="flex">
          <span class="sr-only">Total a convertir</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-5 text-gray-400 rotate-90"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="pl-4 text-sm text-gray-500 leading-6">
            {currencyFormat(new Decimal(inputAmount ? (inputAmount - fee) : 0), inputCurrency)} {inputCurrency}
          </p>
        </dt>
        <dt class="text-sm leading-6 text-gray-500">Total a convertir</dt>
      </div>
      <div class="mt-4 flex w-full px-6 justify-between">
        <dd class="flex">
          <span class="sr-only">Fx rate</span>
          {#if fxRate.direction == FxDirection.Multiply}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-5 text-gray-400 rotate-45"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          {:else}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-5 text-gray-400"
              stroke="currentColor"
            >
              <path
                d="M7 12H17"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 8.01001L12 8.00001"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 16.01L12 16"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke-width="2"
              />
            </svg>
          {/if}
          <p class="pl-4 text-sm text-gray-500 leading-6">
            {fxRate.value.toFixed(2)} {fxRate.direction == FxDirection.Multiply ? `${inputCurrency}/${outputCurrency}` : `${outputCurrency}/${inputCurrency}`}
          </p>
        </dd>
        <dt class="text-sm leading-6 text-gray-500">Tasa de cambio</dt>
      </div>
    </dl>
    <div class="mt-6 border-t border-gray-900/5 {fee != 0 ? 'pb-4' : 'pb-6'}">
      <div class="px-6 pt-6 w-full">
        <label
          for="account-number"
          class="block text-sm font-medium leading-6 text-gray-900"
          >{outputText}</label
        >
        <div class="mt-2 rounded-md shadow-sm flex justify-between">
          <CurrencyInput
            name="outputAmount"
            inputClasses={{
              formatted: "rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-24 sm:w-36",
              formattedPositive: '',
            }}
            currency={outputCurrency == StableCoin.EURC || outputCurrency == FiatCurrency.EUR ? "EUR" : "USD"}
            bind:value={outputAmount}
            onValueChange={modifyOutput}
          />
          <CurrencyDropdown
            currencies={outputCurrencies}
            bind:selected={outputCurrency}
            bind:inputAmount
            bind:outputAmount
          />
        </div>
      </div>
    </div>
    {#if fee != 0}
    <div class="border-t border-gray-900/5 p-4">
      <p class="mt-1 max-w-xs sm:max-w-sm text-sm leading-6 text-gray-500">
        Reducimos en un 10% el costo de una transferecia tradicional
      </p>
    </div>
    {/if}
  </div>
</div>
