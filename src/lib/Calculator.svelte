<script lang="ts">
  import { FiatCurrency, FxDirection } from "$lib/types";
  import { stringToDecimalTable } from "$lib/utils";
  import { Decimal } from "decimal.js";

  import CurrencyDropdown from "$lib/CurrencyDropdown.svelte";

  export let fxRates: undefined | { "EUR-COP": number };
  export let allFees: undefined | { [FiatCurrency.COP]: FeeRateRangeString[], [FiatCurrency.EUR]: FeeRateRangeString[]};

  let inputAmount = 0;
  let inputCurrency = FiatCurrency.COP;
  let outputAmount: number;
  let outputCurrency = FiatCurrency.EUR;
  let fee = 0;
  $: fxRate = getFxRate(inputCurrency, outputCurrency);

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

  function modifyInput() {
    const { value, direction } = fxRate;
    let feeTableString = allFees?.[inputCurrency];
    // somehow an empty field gives a value of empty string.
    let inputAmountDec = new Decimal(inputAmount || 0);
    if (feeTableString === undefined) {
      fee = 0;
      outputAmount =
        direction == FxDirection.Multiply
          ? inputAmountDec.mul(value).toDecimalPlaces(2).toNumber()
          : inputAmountDec.div(value).toDecimalPlaces(2).toNumber();
      return;
    }
    let feeTable = stringToDecimalTable(feeTableString);
    let feeRange = feeTable.find(
      ({ min, max }) =>
        min.lessThanOrEqualTo(inputAmountDec) &&
        inputAmountDec.lessThanOrEqualTo(max)
    );
    console.log("feeRange", feeRange?.min.toString(), feeRange?.max.toString());
    if (feeRange === undefined) {
      fee = 0;
      outputAmount =
        direction == FxDirection.Multiply
          ? inputAmountDec.mul(value).toDecimalPlaces(2).toNumber()
          : inputAmountDec.div(value).toDecimalPlaces(2).toNumber();
      return;
    }
    let feeDec = inputAmountDec.mul(feeRange.rate);
    fee = feeDec.toDecimalPlaces(2).toNumber();
    let preConversion = inputAmountDec.minus(feeDec);
    outputAmount =
      direction == FxDirection.Multiply
        ? preConversion.mul(value).toDecimalPlaces(2).toNumber()
        : preConversion.div(value).toDecimalPlaces(2).toNumber();
  }

  function modifyOutput() {
    const { value, direction } = fxRate;
    const feeTableString = allFees?.[inputCurrency];
    // somehow an empty field gives a value of empty string.
    let outputAmountDec = new Decimal(outputAmount || 0);
    let preConversion =
      direction == FxDirection.Multiply
        ? outputAmountDec.div(value)
        : outputAmountDec.mul(value);
    if (feeTableString === undefined) {
      fee = 0;
      inputAmount = preConversion.toNumber();
      return;
    }
    let feeTable = stringToDecimalTable(feeTableString);
    let initialFeeRange = feeTable.find(
      ({ min, max }) =>
        min.lessThanOrEqualTo(preConversion) &&
        preConversion.lessThanOrEqualTo(max)
    );
    console.log(
      "initialFeeRange",
      initialFeeRange?.min?.toString(),
      initialFeeRange?.max?.toString()
    );
    if (initialFeeRange === undefined) {
      fee = 0;
      inputAmount = preConversion.toNumber();
      return;
    }
    let initialInputAmount = preConversion.div(
      new Decimal(1).minus(initialFeeRange.rate)
    );
    let finalFeeRange =
      feeTable.find(
        ({ min, max }) =>
          min.lessThanOrEqualTo(initialInputAmount) &&
          initialInputAmount.lessThanOrEqualTo(max)
      ) || initialFeeRange;
    console.log(
      "finalFeeRange",
      finalFeeRange.min.toString(),
      finalFeeRange.max.toString()
    );
    let finalInputAmount = preConversion.div(
      new Decimal(1).minus(finalFeeRange.rate)
    );
    inputAmount = finalInputAmount.toDecimalPlaces(2).toNumber();
    fee = finalInputAmount
      .mul(finalFeeRange.rate)
      .toDecimalPlaces(2)
      .toNumber();
  }
</script>

<div class="max-w-sm">
  <h2 class="sr-only">Summary</h2>
  <div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
    <dl class="flex flex-wrap">
      <div class="px-6 pt-6 flex-auto">
        <label
          for="account-number"
          class="block text-sm font-medium leading-6 text-gray-900"
          >You send</label
        >
        <div class="mt-2 rounded-md shadow-sm flex gap-x-4">
          <input
            type="text"
            name="inputAmount"
            id="inputAmount"
            class="rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="1,000"
            bind:value={inputAmount}
            on:input={modifyInput}
          />
          <CurrencyDropdown
            currencies={Object.keys(FiatCurrency)}
            bind:selected={inputCurrency}
          />
        </div>
      </div>

      {#if fee != 0}
        <div
          class="mt-6 flex w-full flex-wrap gap-x-4 border-t border-gray-900/5 px-6 pt-6"
        >
          <dd class="flex flex-auto">
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
              {fee}
              {inputCurrency}
            </p>
          </dd>
          <dt class="text-sm text-gray-500 leading-6">Transfer fee</dt>
        </div>
      {/if}
      <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
        <dt class="flex flex-auto">
          <span class="sr-only">Total we convert</span>
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
            {inputAmount - fee}
            {inputCurrency}
          </p>
        </dt>
        <dt class="text-sm leading-6 text-gray-500">Total we will convert</dt>
      </div>
      <div class="mt-4 flex w-full flex-none gap-x-4 px-6">
        <dd class="flex flex-auto">
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
            {fxRate.value.toFixed(2)}
          </p>
        </dd>
        <dt class="text-sm leading-6 text-gray-500">Guaranteed rate for 24h</dt>
      </div>
    </dl>
    <div class="mt-6 border-t border-gray-900/5 pb-6">
      <div class="px-6 pt-6 flex-auto">
        <label
          for="account-number"
          class="block text-sm font-medium leading-6 text-gray-900"
          >They receive</label
        >
        <div class="mt-2 rounded-md shadow-sm flex gap-x-4">
          <input
            type="text"
            name="outputAmount"
            id="outputAmount"
            class="rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="1,000"
            bind:value={outputAmount}
            on:input={modifyOutput}
          />
          <CurrencyDropdown
            currencies={Object.keys(FiatCurrency)}
            bind:selected={outputCurrency}
          />
        </div>
      </div>
    </div>
  </div>
</div>