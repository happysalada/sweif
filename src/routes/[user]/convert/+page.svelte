<script lang="ts">
  import { Decimal } from "decimal.js";

  import type { PageData } from "./$types";
	import { goto } from "$app/navigation";

  import { StableCoin } from "$lib/types";
  import { user, balances, transactions } from "$lib/stores";

  import UserNav from "$lib/UserNav.svelte";
  import Calculator from "$lib/Calculator.svelte";

  export let data: PageData;
  let inputAmount = 0;
  let inputCurrency = StableCoin.EURC;
  let outputAmount = 0;
  let outputCurrency = StableCoin.USDT;
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
    bind:outputAmount
    bind:outputCurrency
    outputCurrencies={[StableCoin.USDT, StableCoin.USDC]}
    disclaimer={false}
  />
  <button
    type="button"
    disabled={inputAmount == 0 || inputAmount == "" || (new Decimal($balances[inputCurrency])).lt(inputAmount)}
    on:click={() => {
      // inputAmount being zero or more than balance is taken care of by the disabled property
      $balances[inputCurrency] = (new Decimal($balances[inputCurrency])).minus(inputAmount);
      $balances[outputCurrency] = (new Decimal($balances[outputCurrency])).plus(outputAmount);

      $transactions = [...$transactions, {type: "conversion", inputAmount, inputCurrency, outputAmount, outputCurrency, at: new Date()}]

			goto(`/${$user?.email || "nico"}/dashboard`);
    }}
    class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80"
    >Convertir</button
  >
</div>
