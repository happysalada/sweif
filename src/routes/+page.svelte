<script lang="ts">
  import type { PageData } from "./$types";
  import { FiatCurrency, FxDirection } from "$lib/types";
  import { Decimal } from "decimal.js";
  import { stringToDecimalTable } from "$lib/utils"

  import Nav from "$lib/Nav.svelte";
  import Contact from "$lib/Contact.svelte";
  import CurrencyDropdown from "$lib/CurrencyDropdown.svelte";
  export let data: PageData;
  let inputAmount = 0;
  let inputCurrency = FiatCurrency.COP;
  let outputAmount: number;
  let outputCurrency = FiatCurrency.EUR;
  let fee = 0;
  $: fxRate = getFxRate(inputCurrency, outputCurrency);

  console.log(data)
  console.log(fxRate)

  function getFxRate(
    inputCurrency: Currency,
    outputCurrency: Currency
  ): FxRate {
    let rate = data.fxRates?.[`${inputCurrency}-${outputCurrency}`];
    let direction = FxDirection.Multiply;
    if (!rate) {
      rate = data.fxRates?.[`${outputCurrency}-${inputCurrency}`];
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
    let feeTableString = data.feeTable?.[inputCurrency];
    // somehow an empty field gives a value of empty string.
    if (inputAmount == "") return;
    let inputAmountDec = new Decimal(inputAmount);
    if (feeTableString === undefined) {
      outputAmount = (direction == FxDirection.Multiply) ? inputAmountDec.mul(value).toDecimalPlaces(2).toNumber() : inputAmountDec.div(value).toDecimalPlaces(2).toNumber()
      return
    }
    let feeTable = stringToDecimalTable(feeTableString);
    let feeRange = feeTable.find(({min, max}) => min.lessThanOrEqualTo(inputAmountDec) && inputAmountDec.lessThanOrEqualTo(max))
    console.log("feeRange", feeRange?.min.toString(), feeRange?.max.toString())
    if (feeRange === undefined) {
      outputAmount = (direction == FxDirection.Multiply) ? inputAmountDec.mul(value).toDecimalPlaces(2).toNumber() : inputAmountDec.div(value).toDecimalPlaces(2).toNumber()
      return
    }
    let feeDec = inputAmountDec.mul(feeRange.rate);
    fee = feeDec.toDecimalPlaces(2).toNumber();
    let preConversion = inputAmountDec.minus(feeDec);
    outputAmount = (direction == FxDirection.Multiply) ? preConversion.mul(value).toDecimalPlaces(2).toNumber() : preConversion.div(value).toDecimalPlaces(2).toNumber()
  }

  function modifyOutput() {
    const { value, direction } = fxRate;
    const feeTableString = data.feeTable?.[inputCurrency];
    // somehow an empty field gives a value of empty string.
    if (outputAmount == "") return;
    let outputAmountDec = new Decimal(outputAmount);
    let preConversion = (direction == FxDirection.Multiply) ? outputAmountDec.div(value) : outputAmountDec.mul(value);
    if (feeTableString === undefined) {
      inputAmount = preConversion.toNumber()
      return
    }
    let feeTable = stringToDecimalTable(feeTableString);
    let initialFeeRange = feeTable.find(({min, max}) => min.lessThanOrEqualTo(preConversion) && preConversion.lessThanOrEqualTo(max))
    console.log("initialFeeRange", initialFeeRange?.min?.toString(), initialFeeRange?.max?.toString());
    if (initialFeeRange === undefined) {
      inputAmount = preConversion.toNumber()
      return
    }
    let initialInputAmount = preConversion.div((new Decimal(1)).minus(initialFeeRange.rate));
    let finalFeeRange = feeTable.find(({min, max}) =>  min.lessThanOrEqualTo(initialInputAmount) && initialInputAmount.lessThanOrEqualTo(max)) || initialFeeRange;
    console.log("finalFeeRange", finalFeeRange.min.toString(), finalFeeRange.max.toString());
    let finalInputAmount = preConversion.div((new Decimal(1)).minus(finalFeeRange.rate));
    inputAmount = finalInputAmount.toDecimalPlaces(2).toNumber()
    fee = finalInputAmount.mul(finalFeeRange.rate).toDecimalPlaces(2).toNumber();
  }
</script>

<Nav />

<div class="bg-white">
  <div class="relative isolate pt-14">
    <svg
      class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
      />
    </svg>
    <div
      class="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8 pb-24"
    >
      <div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <h1
          class="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
        >
          Tu cuenta de dinero digital sin fronteras
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Convierte tu dinero a monedas estables en el app y retiralo en la
          cuenta bancaria que quieras!
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <a
            href="/signin"
            class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >Crea tu cuenta</a
          >
          <a
            href="#features"
            class="text-sm font-semibold leading-6 text-gray-900"
            >Más información<span aria-hidden="true">→</span></a
          >
        </div>
      </div>

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
              <dt class="text-sm leading-6 text-gray-500">
                Total we will convert
              </dt>
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
              <dt class="text-sm leading-6 text-gray-500">
                Guaranteed rate for 24h
              </dt>
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
    </div>
  </div>
</div>

<div id="features" class="overflow-hidden bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl md:px-6 lg:px-8">
    <div
      class="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start"
    >
      <div class="px-6 lg:px-0 lg:pr-4 lg:pt-4">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
          <h2 class="text-base font-semibold leading-7 text-primary-600">
            Giros internacionales
          </h2>
          <p
            class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Envía y recibe dinero digital desde tu app
          </p>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Ten el control de tus finanzas usando monedas estables
          </p>
          <dl
            class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
          >
            <div class="relative pl-9">
              <dt class="inline font-semibold text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute left-1 top-1 h-5 w-5 text-primary-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                  />
                </svg>
                Tu billetera digital en distintas monedas
              </dt>
              <dd class="inline">
                Protege tu dinero en dolares y euros digitales
              </dd>
            </div>

            <div class="relative pl-9">
              <dt class="inline font-semibold text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute left-1 top-1 h-5 w-5 text-primary-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Casa de cambio de monedas digitales
              </dt>
              <dd class="inline">
                Intercambia entre monedas digitales de forma instantanea
              </dd>
            </div>

            <div class="relative pl-9">
              <dt class="inline font-semibold text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute left-1 top-1 h-5 w-5 text-primary-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
                Giros internacionales usando monedas digitales
              </dt>
              <dd class="inline">
                Transferencias internacionales muy rapidas y seguras usando
                monedas digitales.
              </dd>
            </div>

            <div class="relative pl-9">
              <dt class="inline font-semibold text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute left-1 top-1 h-5 w-5 text-primary-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                  />
                </svg>
                Retira directo a tu cuenta bancaria
              </dt>
              <dd class="inline">
                Retira tus monedas digitales directo a tu cuenta bancaria en
                Colombia o España
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
        <svg
          viewBox="0 0 366 729"
          role="img"
          class="mx-auto w-[22.875rem] max-w-full drop-shadow-xl"
        >
          <title>App screenshot</title>
          <defs>
            <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
              <rect width="316" height="684" rx="36" />
            </clipPath>
          </defs>
          <path
            fill="#4B5563"
            d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
          />
          <path
            fill="#343E4E"
            d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
          />
          <foreignObject
            width="316"
            height="684"
            transform="translate(24 24)"
            clip-path="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
          >
            <img src="/app-screenshot.png" alt="" />
          </foreignObject>
        </svg>
      </div>
    </div>
  </div>
</div>

<Contact />
