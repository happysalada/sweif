<script lang="ts">
  import type { PageData } from "./$types";
  import { StableCoin, FiatCurrency } from "$lib/types";

  import UserNav from "$lib/UserNav.svelte";
  import DepositConfirmModal from "$lib/DepositConfirmModal.svelte";
  import Calculator from "$lib/Calculator.svelte";

  export let data: PageData;
  let inputAmount = 0;
  let inputCurrency = FiatCurrency.COP
  let outputAmount = 0;
  let outputCurrency = StableCoin.EURC
  let showModal = false;
</script>

<UserNav />

<DepositConfirmModal bind:showModal bind:inputAmount {inputCurrency} bind:outputAmount {outputCurrency} />

<div class="w-full flex flex-col justify-center items-center">
  <Calculator
    fxRates={data.fxRates}
    allFees={undefined}
    bind:inputAmount
    bind:inputCurrency
    inputCurrencies={[FiatCurrency.COP]}
    bind:outputAmount
    bind:outputCurrency
    outputCurrencies={[StableCoin.EURC]}
    disclaimer={true}
  />
  <button
    type="button"
    on:click={() => (showModal = true)}
    class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80"
    >Recargar</button
  >
</div>

