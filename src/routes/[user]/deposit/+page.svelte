<script lang="ts">
  import type { PageData } from "./$types";

  import UserNav from "$lib/UserNav.svelte";
  import Calculator from "$lib/Calculator.svelte";

  export let data: PageData;

  let showModal = false;
</script>

<UserNav />

<div class="overflow-hidden bg-white shadow sm:rounded-lg m-12">
  <div class="px-4 py-6 sm:px-6">
    <h3 class="text-base font-semibold leading-7 text-gray-900">
      Transferencia Bancaria
    </h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      Para recargar tu billetera sweif envia una transferencia bancaria a la cuenta Bancolombia de Bitva Colombia SAS y completa los espacios inferiores. Una vez que el dinero ingrese a la cuenta se vera reflejado en tu cuenta sweif.
    </p>
  </div>
  <div class="border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Name</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          Bitval Colombia SAS
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">NIT</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          901617634-7
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Número de cuenta</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          19300001303
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Descripción</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          Por favor consignar el valor a recargar en la siguiente cuenta bancaria. Una vez hecha la transacción, por favor ingresar en el siguiente recuadro el valor enviado y subir adjuntar el comprobante de la transacción.
        </dd>
      </div>

      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium leading-6 text-gray-900">
          Bank name
        </dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <div class="flex justify-start gap-8">
            <div class="sm:col-span-2">
              <label for="bankAccount" class="sr-only">Bank account</label>
              <div>
                <select
                  id="bankAccount"
                  name="bankAccount"
                  autocomplete="bankAccount"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="CO">Bancolombia</option>
                </select>
              </div>
            </div>

          </div>
        </dd>

        <dt class="text-sm font-medium leading-6 text-gray-900">
          Last 4 digits
        </dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <div class="flex justify-start gap-8">
            <div class="sm:col-span-2">
              <label for="bankAccount" class="sr-only">Bank account</label>
              <div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
        </dd>
      </div>

      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium leading-6 text-gray-900">
          Calculator
        </dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <Calculator fxRates={data.fxRates} allFees={undefined}/>
        </dd>
      </div>

      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium leading-6 text-gray-900">Monto transfeirdo a cuenta Bitval</dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <button
            type="button"
            class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >Submit</button
          >
        </dd>
      </div>
    </dl>
  </div>
</div>
