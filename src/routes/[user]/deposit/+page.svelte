<script lang="ts">
  import type { PageData } from "./$types";
  import { StableCoin, FiatCurrency } from "$lib/types";

  import UserNav from "$lib/UserNav.svelte";
  import DepositConfirmModal from "$lib/DepositConfirmModal.svelte";
  import Calculator from "$lib/Calculator.svelte";

  export let data: PageData;
  let inputAmount: undefined | number;
  let inputCurrency = FiatCurrency.COP
  let outputAmount = 0;
  let outputCurrency = StableCoin.EURC
  let showModal = false;
</script>

<UserNav />

<DepositConfirmModal bind:showModal bind:inputAmount {inputCurrency} bind:outputAmount {outputCurrency} />

<div class="w-full flex flex-col justify-center items-center">

  <div class="px-4 py-6 sm:px-6">
    <h3 class="text-base font-semibold leading-7 text-gray-900">
      Instrucciones:
    </h3>
    <p class="mt-1 max-w-xs sm:max-w-sm text-sm leading-6 text-gray-500">
      Puedes transferir dinero entre países en tan solo 2 pasos:
      <br>
      1. Recargar: Recarga tu billetera sweif directamente desde tu cuenta bancaria siguiendo los pasos de recarga.
      <br>
      2. Retirar: Registra la cuenta a la que envías el dinero y retira tu saldo sweif en el país que elijas.
    </p>
  </div>

  <Calculator
    fxRates={data.fxRates}
    allFees={undefined}
    bind:inputAmount
    bind:inputCurrency
    inputCurrencies={[FiatCurrency.COP]}
    bind:outputAmount
    bind:outputCurrency
    outputCurrencies={[StableCoin.EURC]}
  />
  <button
    type="button"
    on:click={() => (showModal = true)}
    class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80"
    >Recargar</button
  >
</div>

