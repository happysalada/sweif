<script lang="ts">
  import type { PageData } from "./$types";

  import { Decimal } from "decimal.js";

  import { currencyFormat } from "$lib/utils";
  import { transactions, user } from "$lib/stores";

  import TopupInstructions from "$lib/TopupInstructions.svelte";
  import HistoryItem from "$lib/HistoryItem.svelte";

  export let data: PageData;
</script>

<div class="w-full flex flex-col justify-center items-center">
  <div class="px-4 py-6 sm:px-6">
    <TopupInstructions />
  </div>
  <a
    href={`/${$user?.email}/transfer`}
    class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-80 text-center"
    >Transferir</a
  >
</div>
<div class="flow-root m-8 w-3/4 mx-auto">
  <h2 class="text-base font-semibold leading-7 text-gray-900 mb-4">
    Historial de transacciones
  </h2>
  {#await data.transactionResults}
    <h3 class="text-base font-semibold leading-7 text-gray-900 mb-4">
      Loading
    </h3>
  {:then [{ result: depositRequestsRaw }, { result: withdrawalRequestsRaw }, { result: transferRequestsRaw }]}
    {@const depositRequests = (depositRequestsRaw || []).map((it) => ({
      ...it,
      created_at: new Date(it.created_at),
    }))}
    {@const withdrawalRequests = (withdrawalRequestsRaw || []).map((it) => ({
      ...it,
      created_at: new Date(it.created_at),
    }))}
    {@const transferRequests = (transferRequestsRaw || []).map((it) => ({
      ...it,
      created_at: new Date(it.created_at),
    }))}
    {@const all = $transactions
      .concat(withdrawalRequests)
      .concat(depositRequests)
      .concat(transferRequests)}
    {@const _ = all.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime()
    )}
    <ul class="-mb-8">
      {#each all as transaction}
        {#if "deposit_request" in transaction}
          {@const inputAmount = new Decimal(
            transaction.deposit_request.input_amount
          )}
          {@const outputAmount = new Decimal(
            transaction.deposit_request.output_amount
          )}
          {@const inputCurrency = transaction.deposit_request.input_currency.code}
          {@const outputCurrency = transaction.deposit_request.output_currency.code}
          {@const createdAt = new Date(transaction.created_at)}
          <HistoryItem
            color="green"
            text="Recargaste {inputCurrency} {currencyFormat(
              inputAmount,
              inputCurrency
            )} en {outputCurrency} {currencyFormat(
              outputAmount,
              outputCurrency
            )} - Transacción confirmada"
            at={createdAt}
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
          </HistoryItem>
        {:else if transaction.type == "deposit_request"}
          {@const inputAmount = new Decimal(transaction.input_amount)}
          {@const outputAmount = new Decimal(transaction.output_amount)}
          {@const inputCurrency = transaction.input_currency.code}
          {@const outputCurrency = transaction.output_currency.code}
          {@const createdAt = new Date(transaction.created_at)}
          <HistoryItem
            color="gray"
            text=" Recargaste {inputCurrency} {currencyFormat(
              inputAmount,
              inputCurrency
            )} en {outputCurrency} {currencyFormat(
              outputAmount,
              outputCurrency
            )} - Transacción en proceso"
            at={createdAt}
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
          </HistoryItem>
        {:else if "withdrawal_request" in transaction}
          {@const inputAmount = new Decimal(
            transaction.withdrawal_request.input_amount
          )}
          {@const outputAmount = new Decimal(
            transaction.withdrawal_request.output_amount
          )}
          {@const inputCurrency = transaction.withdrawal_request.input_currency.code}
          {@const outputCurrency =
            transaction.withdrawal_request.output_currency.code}
          {@const createdAt = new Date(transaction.created_at)}
          <HistoryItem
            color="blue"
            text=" Enviaste {inputCurrency} {currencyFormat(
              inputAmount,
              inputCurrency
            )} en {outputCurrency} {currencyFormat(
              outputAmount,
              outputCurrency
            )} - Transacción confirmada"
            at={createdAt}
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
                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
              />
            </svg>
          </HistoryItem>
        {:else if transaction.type == "withdrawal_request"}
          {@const inputAmount = new Decimal(transaction.input_amount)}
          {@const outputAmount = new Decimal(transaction.output_amount)}
          {@const inputCurrency = transaction.input_currency.code}
          {@const outputCurrency = transaction.output_currency.code}
          {@const createdAt = new Date(transaction.created_at)}
          <HistoryItem
            color="gray"
            text=" Enviaste {inputCurrency} {currencyFormat(
              inputAmount,
              inputCurrency
            )} en {outputCurrency} {currencyFormat(
              outputAmount,
              outputCurrency
            )} - Transacción en proceso"
            at={createdAt}
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
                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
              />
            </svg>
          </HistoryItem>
        {:else if transaction.type == "transfer_request"}
          {@const inputAmount = new Decimal(transaction.input_amount)}
          {@const outputAmount = new Decimal(transaction.output_amount)}
          {@const inputCurrency = transaction.input_currency.code}
          {@const outputCurrency = transaction.output_currency.code}
          {@const createdAt = new Date(transaction.created_at)}
          {#if transaction.sent_at}
            <HistoryItem
              color="green"
              text="Transferencia completada - Transferiste {inputCurrency} {currencyFormat(
                inputAmount,
                inputCurrency
              )} recibes {outputCurrency} {currencyFormat(
                outputAmount,
                outputCurrency
              )}"
              at={createdAt}
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
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            </HistoryItem>
          {/if}

          {#if transaction.received_at}
            <HistoryItem
              color="indigo"
              text=" Recibimos tu dinero, transferencia en proceso - Transferiste {inputCurrency} {currencyFormat(
                inputAmount,
                inputCurrency
              )} recibes {outputCurrency} {currencyFormat(
                outputAmount,
                outputCurrency
              )}"
              at={createdAt}
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
                  d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
              </svg>
            </HistoryItem>
          {/if}

          <HistoryItem
            color="gray"
            text="En proceso, estamos esperando tu dinero - Transferiste {inputCurrency} {currencyFormat(
              inputAmount,
              inputCurrency
            )} recibes {outputCurrency} {currencyFormat(
              outputAmount,
              outputCurrency
            )}"
            at={createdAt}
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
                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
              />
            </svg>
          </HistoryItem>
        {/if}
      {/each}
    </ul>
  {:catch error}
    <h3 class="text-base font-semibold leading-7 text-gray-900 mb-4">
      {error}
    </h3>
  {/await}
</div>
