<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  export let contactForm: any;

  enum State {
    Input,
    Submitted,
  }
  let state = State.Input;

  const { form, enhance, errors, constraints } = superForm(contactForm, {
    validators: {
      firstName: (input) =>
        input ? undefined
          : "Please add your first name",
      lastName: (input) =>
        input ? undefined : "Please add your last name",
      email: (input) =>
        input ? undefined : "please add your email",
      phone: (input) =>
        input ? undefined : "Please add your phone number",
      message: (input) =>
        input ? undefined : "Please write a message",
    },
    onError({ result, message }) {
      console.log(result);
      console.log(message);
    },
    resetForm: true,
    onResult({ result }) {
      if (result.type === "success") {
        state = State.Submitted;
      } else if (result.type === "failure") {
        console.log(result);
      }
    },
  });
</script>

<div id="contact" class="relative isolate bg-gray-900">
  <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
    <div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
      <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
        <div
          class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2"
        >
          <svg
            class="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                width="200"
                height="200"
                x="100%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="100%" y="-1" class="overflow-visible fill-gray-800/20">
              <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
            </svg>
            <rect
              width="100%"
              height="100%"
              stroke-width="0"
              fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
            />
          </svg>
          <div
            class="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
            aria-hidden="true"
          >
            <div
              class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
              style="clip-path: polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)"
            />
          </div>
        </div>
        <h2 class="text-3xl font-bold tracking-tight text-white">
          Contacto
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Estamos muy felices de tenerte acá con nosotros y sabemos que puedes tener dudas que quieras responder. Dejanos tus datos y tu pregunta. En muy poco tiempo nuestro equipo se pondrá en contacto contigo directamente.
        </p>
        <dl class="mt-10 space-y-4 text-base leading-7 text-gray-300">
          <div class="flex gap-x-4">
            <dt class="flex-none">
              <span class="sr-only">Email</span>
              <svg
                class="h-7 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </dt>
            <dd>
              <a class="hover:text-white" href="mailto:admin@sweif.com"
                >admin@sweif.com</a
              >
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <form
      action="?/createContact"
      method="POST"
      use:enhance
      class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
    >
      <div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              for="firstName"
              class="block text-sm font-semibold leading-6 text-white"
              >Nombre</label
            >
            <div class="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="firstName"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.firstName
                    ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
                    : 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                aria-invalid={$errors.firstName != undefined}
                aria-describedby={$errors.firstName != undefined
                  ? "first-name-error"
                  : ""}
                data-invalid={$errors.firstName}
                bind:value={$form.firstName}
                {...$constraints.firstName}
              />
            </div>
            {#if $errors.firstName}
              <p class="mt-2 text-sm text-red-600" id="first-name-error">
                {$errors.firstName}
              </p>
            {/if}
          </div>
          <div>
            <label
              for="lastName"
              class="block text-sm font-semibold leading-6 text-white"
              >Apellido</label
            >
            <div class="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="lastName"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.lastName
                    ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
                    : 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                aria-invalid={$errors.lastName != undefined}
                aria-describedby={$errors.lastName != undefined
                  ? "last-name-error"
                  : ""}
                data-invalid={$errors.lastName}
                bind:value={$form.lastName}
                {...$constraints.lastName}
              />
            </div>
            {#if $errors.lastName}
              <p class="mt-2 text-sm text-red-600" id="last-name-error">
                {$errors.lastName}
              </p>
            {/if}
          </div>
          <div class="sm:col-span-2">
            <label
              for="email"
              class="block text-sm font-semibold leading-6 text-white"
              >Email</label
            >
            <div class="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.email
                    ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
                    : 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                aria-invalid={$errors.email != undefined}
                aria-describedby={$errors.email != undefined
                  ? "email-error"
                  : ""}
                data-invalid={$errors.email}
                bind:value={$form.email}
                {...$constraints.email}
              />
            </div>
            {#if $errors.email}
              <p class="mt-2 text-sm text-red-600" id="email-error">
                {$errors.email}
              </p>
            {/if}
          </div>
          <div class="sm:col-span-2">
            <label
              for="phone"
              class="block text-sm font-semibold leading-6 text-white"
              >Número de teléfono</label
            >
            <div class="mt-2.5">
              <input
                type="tel"
                name="phone"
                id="phone"
                autocomplete="tel"
                class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.phone
                    ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
                    : 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                aria-invalid={$errors.phone != undefined}
                aria-describedby={$errors.phone != undefined
                  ? "phone-error"
                  : ""}
                data-invalid={$errors.phone}
                bind:value={$form.phone}
                {...$constraints.phone}
              />
            </div>
            {#if $errors.phone}
              <p class="mt-2 text-sm text-red-600" id="phone-error">
                {$errors.phone}
              </p>
            {/if}
          </div>
          <div class="sm:col-span-2">
            <label
              for="message"
              class="block text-sm font-semibold leading-6 text-white"
              >Mensaje</label
            >
            <div class="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows="4"
                class="block w-full rounded-md border-0 py-1.5 pr-10 {$errors.message
                    ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-500'
                    : 'text-gray-900 ring-gray-300 focus:ring-primary-500'} ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                aria-invalid={$errors.message != undefined}
                aria-describedby={$errors.message != undefined
                  ? "message-error"
                  : ""}
                data-invalid={$errors.message}
                bind:value={$form.message}
                {...$constraints.message}
              />
            </div>
            {#if $errors.message}
              <p class="mt-2 text-sm text-red-600" id="message-error">
                {$errors.message}
              </p>
            {/if}
          </div>
        </div>
        <div class="mt-8 flex justify-end">
          {#if state == State.Input}
            <button
              class="rounded-md bg-primary-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >Enviar mensaje</button
            >
          {:else if state == State.Submitted}
            <button
              disabled
              class="rounded-md bg-green-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >Gracias! Te contactaremos lo más pronto posible</button
            >
          {/if}
        </div>
      </div>
    </form>
  </div>
</div>
