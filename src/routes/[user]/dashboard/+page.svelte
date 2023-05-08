<script lang="ts">
  import { Decimal } from "decimal.js";

  import { monthNames, humanReadableDate } from "$lib/utils";
  import { transactions, user } from "$lib/stores";

  import UserNav from "$lib/UserNav.svelte";
</script>

<UserNav />

{#if $transactions.length == 0}
  <div class="w-full flex flex-col justify-center items-center">
    <div class="px-4 py-6 sm:px-6">
      <h3 class="text-base font-semibold leading-7 text-gray-900">
        Instrucciones:
      </h3>
      <p class="mt-1 max-w-xs sm:max-w-sm text-sm leading-6 text-gray-500">
        Puedes transferir dinero entre países en tan solo 2 pasos:
        <br />
        1. Recargar: Recarga tu billetera sweif directamente desde tu cuenta bancaria
        siguiendo los pasos de recarga.
        <br />
        2. Retirar: Registra la cuenta a la que envías el dinero y retira tu saldo
        sweif en el país que elijas.
      </p>
    </div>
    <a
      href={`/${$user?.email || 'nico'}/deposit`}
      class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80 text-center"
      >Recargar</a
    >
  </div>
{:else}
  <div class="flow-root m-8 w-3/4 mx-auto">
    <ul class="-mb-8">
      {#each $transactions.reverse() as { type, inputAmount: stringInputAmount, inputCurrency, outputAmount: stringOutputAmount, outputCurrency, at: stringAt }}
        {@const at = new Date(stringAt)}
        {@const inputAmount = new Decimal(stringInputAmount)}
        {@const outputAmount = new Decimal(stringOutputAmount)}
        {#if type == "deposit"}
          <li>
            <div class="relative pb-8">
              <span
                class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span
                    class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                >
                  <div>
                    <p class="text-sm text-gray-500">
                      Recargaste {inputCurrency} {inputAmount} en {outputAmount} {outputCurrency} - Transacción en proceso
                    </p>
                  </div>
                  <div
                    class="whitespace-nowrap text-right text-sm text-gray-500"
                  >
                    <time datetime={humanReadableDate(at)}
                      >{monthNames[at.getMonth()]}
                      {String(at.getDate()).padStart(2, "0")}</time
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>
        {:else if type == "conversion"}
          <li>
            <div class="relative pb-8">
              <span
                class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span
                    class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                >
                  <div>
                    <p class="text-sm text-gray-500">
                      Convertiste {inputCurrency}
                      {inputAmount} a {outputCurrency}
                      {outputAmount}
                    </p>
                  </div>
                  <div
                    class="whitespace-nowrap text-right text-sm text-gray-500"
                  >
                    <time datetime={humanReadableDate(at)}
                      >{monthNames[at.getMonth()]}
                      {String(at.getDate()).padStart(2, "0")}</time
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!--
      <li>
        <div class="relative pb-8">
          <span
            class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <div class="relative flex space-x-3">
            <div>
              <span
                class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </span>
            </div>
            <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p class="text-sm text-gray-500">Enviaste USDT $5.00 a Simon</p>
              </div>
              <div class="whitespace-nowrap text-right text-sm text-gray-500">
                <time datetime="2020-09-28">Sep 28</time>
              </div>
            </div>
          </div>
        </div>
      </li>
      -->
        {:else if type == "withdrawal"}
          <li>
            <div class="relative pb-8">
              <span
                class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span
                    class="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
                >
                  <div>
                    <p class="text-sm text-gray-500">
                      Retiraste {outputCurrency}
                      {outputAmount}
                    </p>
                  </div>
                  <div
                    class="whitespace-nowrap text-right text-sm text-gray-500"
                  >
                    <time datetime={humanReadableDate(at)}
                      >{monthNames[at.getMonth()]}
                      {String(at.getDate()).padStart(2, "0")}</time
                    >
                  </div>
                </div>
              </div>
            </div>
          </li>
        {/if}
      {/each}
    </ul>
  </div>
{/if}
