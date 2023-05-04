<script lang="ts">
  import type { PageData } from "./$types";
  import { FiatCurrency } from "$lib/types";

  import Nav from "$lib/Nav.svelte";
  import Contact from "$lib/Contact.svelte";
  import Calculator from "$lib/Calculator.svelte";
  export let data: PageData;
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
      <div class="flex flex-col justify-center items-center text-center">
        <Calculator
          fxRates={data.fxRates}
          allFees={data.feeTable}
          inputCurrencies={[FiatCurrency.COP, FiatCurrency.EUR]}
          inputCurrency={FiatCurrency.COP}
          outputCurrencies={[FiatCurrency.COP, FiatCurrency.EUR]}
          outputCurrency={FiatCurrency.EUR}
        />
        <a
          href="/signin"
          class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 mt-6 w-72 sm:w-80"
          >Crea tu cuenta</a
        >
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
