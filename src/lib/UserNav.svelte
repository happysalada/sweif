<script lang="ts">
  import { balances, user } from "$lib/stores";
  import { currencyFormat } from "$lib/utils";
</script>

<div class="h-full bg-gray-800 p-6">
  <div class="lg:flex lg:items-center lg:justify-between">
    <a href={`/${$user?.email}/dashboard`} class="min-w-0 flex-1">
      <h2
        class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
      >
        Hola {$user?.name}
      </h2>
      <div
        class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
      >
        {#if Object.entries($balances).filter(([_currency, amount]) => !amount.isZero()).length !== 0}
          <p class="text-white text-lg mt-4 font-medium">Balances:</p>
        {/if}
        {#each Object.entries($balances) as [currency, amount]}
          {#if !amount.isZero()}
            <span
              class="mt-4 inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800"
              >{currency} {currencyFormat(amount, currency)}</span
            >
          {/if}
        {/each}
      </div>
    </a>

    <div
      class="m-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
    >
      <a
        href={`/${$user?.email}/transfer`}
        class="inline-flex justify-center rounded-md bg-white px-5 py-4 text-sm font-semibold text-gray-900 shadow-sm ring-4 ring-green-300 bg-green-200 hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="-ml-0.5 mr-1.5 h-5 w-5 text-green-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          />
        </svg>

        <span>Transferir</span>
      </a>
    </div>

    <!--
    <div>
      <a
        href={`/${$user?.email}/deposit`}
        class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span>Recargar</span>
      </a>

      <a
        href={`/${$user?.email}/convert`}
        class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        <span>Convertir</span>
      </a>
      -->

      <!--
      <button
        type="button"
        class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
          />
        </svg>

        <span>Enviar</span>
      </button>

      <a
        href={`/${$user?.email}/withdraw`}
        class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
          />
        </svg>

        <span>Enviar</span>
      </a>
    </div>
    -->
  </div>
</div>
