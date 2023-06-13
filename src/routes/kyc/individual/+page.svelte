<script lang="ts">
  import type { PageData } from "./$types";
  import DocumentUpload from "$lib/kyc/DocumentUpload.svelte";
  import ThankYou from "$lib/kyc/ThankYou.svelte";
  import CenteredCard from "$lib/atoms/CenteredCard.svelte";
  import Listbox from "$lib/atoms/Listbox.svelte";
  import TextInput from "$lib/atoms/TextInput.svelte";
  import {
    Flow,
    OverlayType,
    UploadType,
    KycDocumentType,
    IdCardStep,
  } from "$lib/kyc/types";
  import { flow, uploadType, idCardStep } from "$lib/kyc/stores";
  import { uploadFile } from "$lib/utils";
  import { superForm } from "sveltekit-superforms/client";
  import { onMount } from "svelte";

  export let data: PageData;

  const { form, errors, constraints, enhance } = superForm(data.form, {
    validators: {
      // id_type: (input) => (input ? undefined : "Please select an id type"),
      id_number: (input) => (input ? undefined : "Please enter your id number"),
      // pep: (input) =>
      // 	input
      // 		? undefined
      // 		: "Please choose if you are a politically exposed person",
    },
    onError({ result, message }) {
      console.log(result);
      console.log(message);
    },
    onResult({ result }) {
      if (result.type === "success") {
        flow.set(Flow.DocumentUpload)
      } else if (result.type === "failure") {
        console.log(result);
      }
    },
  });
</script>

{#if $flow == Flow.Questionaire}
  <CenteredCard>
    <h2
      class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      slot="header"
    >
      KYC
    </h2>

    <form slot="main" class="space-y-6" method="POST" use:enhance>
      <Listbox
        list={[
          { value: KycDocumentType.ID_CARD, name: "Id card" },
          { value: KycDocumentType.PASSPORT, name: "Passport" },
        ]}
        selected={{ value: KycDocumentType.ID_CARD, name: "Id card" }}
        label="Id type"
        displayProperty="name"
        onSelect={(element) => {
          $form.id_type = element.value;
          $uploadType = element.value;
        }}
      />
      <input name="id_type" type="hidden" bind:value={$form.id_type} />

      <TextInput
        label="Id number"
        id="id_number"
        name="id_number"
        type="text"
        error={$errors.id_number}
        bind:value={$form.id_number}
        constraints={$constraints.id_number}
        autocomplete="id-number"
      />

      <Listbox
        list={[
          { value: true, name: "Yes" },
          { value: false, name: "No" },
        ]}
        selected={{ value: false, name: "No" }}
        label="Are you a politically exposed person ?"
        displayProperty="name"
        onSelect={(element) => {
          $form.pep = element.value === "true";
        }}
      />
      <input name="pep" type="hidden" bind:value={$form.pep} />

      <div>
        <button
          class="flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >Submit</button
        >
      </div>
    </form>
  </CenteredCard>
{:else if $flow == Flow.DocumentUpload && $uploadType == UploadType.ID_CARD && $idCardStep == IdCardStep.FRONT}
  <DocumentUpload
    title="Upload ID"
    paragraph="Place your ID inside the frame and take a picture. Make sure it is not cut or has any glare."
    overlayType={OverlayType.CARD}
    onSubmit={(dataUri) => {
      uploadFile("id_front.jpg", dataUri);
      $idCardStep = IdCardStep.BACK
    }}
  />
{:else if $flow == Flow.DocumentUpload && $uploadType == UploadType.ID_CARD && $idCardStep == IdCardStep.BACK}
  <DocumentUpload
    title="Id card back side"
    paragraph="Place the back side of your ID card inside the frame and take a picture. Make sure it is not cut or has any glare."
    overlayType={OverlayType.CARD}
    onSubmit={(dataUri) => {
      uploadFile("id_back.jpg", dataUri);
      $flow = Flow.SelfieUpload
    }}
  />
{:else if $flow == Flow.DocumentUpload && $uploadType == UploadType.PASSPORT}
  <DocumentUpload
    title="Passport"
    paragraph="Place your passport inside the frame and take a picture. Make sure it is not cut or has any glare."
    overlayType={OverlayType.PASSPORT}
    onSubmit={(dataUri) => {
      uploadFile("passport.jpg", dataUri);
      $flow = Flow.SelfieUpload
    }}
  />
{:else if $flow == Flow.SelfieUpload}
  <DocumentUpload
    title="Selfie"
    paragraph="Place your face the frame and take a picture. Make sure it is not cut or has any glare."
    overlayType={OverlayType.SELFIE}
    onSubmit={(dataUri) => {
      uploadFile("selfie.jpg", dataUri);
      $flow = Flow.ThankYou
    }}
  />
{:else if $flow == Flow.ThankYou}
  <ThankYou />
{/if}
