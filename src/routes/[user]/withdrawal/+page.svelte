<script lang="ts">
  import UserNav from "$lib/UserNav.svelte";
  import NewBankAccountModal from "$lib/NewBankAccountModal.svelte";

  let showModal = false;
</script>

<NewBankAccountModal {showModal} />

<UserNav />

<div class="overflow-hidden bg-white shadow sm:rounded-lg m-12">
  <div class="px-4 py-6 sm:px-6">
    <h3 class="text-base font-semibold leading-7 text-gray-900">
      Bank details
    </h3>
    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
      Here are the bank details for depositing on sweif
    </p>
  </div>
  <div class="border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Full name</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          Margot Foster
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Application for</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          Backend Developer
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Email address</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          margotfoster@example.com
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">Salary expectation</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          $120,000
        </dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-900">About</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt
          cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint.
          Sit id mollit nulla mollit nostrud in ea officia proident. Irure
          nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
        </dd>
      </div>

      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium leading-6 text-gray-900">
          Bank account
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

            <button
              type="button"
              on:click={() => (showModal = true)}
              class="rounded-md bg-primary-600 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >New account</button
            >
          </div>
        </dd>
      </div>

      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium leading-6 text-gray-900">Amount</dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          <div class="flex justify-start gap-8">
            <div>
              <label for="email" class="sr-only">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>

            <button
              type="button"
              class="rounded-md bg-primary-600 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >Submit</button
            >
          </div>
        </dd>
      </div>
    </dl>
  </div>
</div>
