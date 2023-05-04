<script lang="ts">
  import type { PageData } from "./$types";
  import { StableCoin, FiatCurrency } from "$lib/types";
  import { BANKS } from "$lib/constants";
  import { Decimal } from "decimal.js";

  import UserNav from "$lib/UserNav.svelte";
  import Calculator from "$lib/Calculator.svelte";

  export let data: PageData;
  let inputAmount = 0;
  let inputCurrency = StableCoin.EURC;
</script>

<UserNav />

<div class="w-full flex flex-col justify-center items-center">
  <Calculator
    fxRates={data.fxRates}
    allFees={{
      [StableCoin.EURC]: [{ min: "0", max: "Infinity", rate: "0.01" }],
    }}
    bind:inputAmount
    bind:inputCurrency
    inputCurrencies={[StableCoin.EURC]}
    outputCurrency={StableCoin.USDT}
    outputCurrencies={[StableCoin.USDT, StableCoin.USDC]}
    disclaimer={false}
  />
  <button
    type="button"
    class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80"
    >Convertir</button
  >
</div>
