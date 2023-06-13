<script lang="ts">
  import CameraPhoto, {
    FACING_MODES,
    IMAGE_TYPES,
  } from "jslib-html5-camera-photo";
  import { onMount, onDestroy } from "svelte";
  import CameraButton from "$lib/kyc/CameraButton.svelte";
  import Overlay from "$lib/kyc/Overlay.svelte";
  import BackButton from "$lib/kyc/BackButton.svelte";

  export let submitted = false;
  export let dataUri = "";
  export let title = "";
  export let paragraph = "";
  export let overlayType: OverlayType;

  let video: HTMLVideoElement;
  let cameraPhoto: CameraPhoto | undefined = undefined;
  let stream: MediaStream;

  onMount(() => {
    if (!video) return;
    cameraPhoto = new CameraPhoto(video);
    cameraPhoto
      .startCamera(FACING_MODES.ENVIRONMENT, {
        width: 1920,
        height: 1080,
      })
      .then((cameraStream) => {
        console.log("stream", cameraStream);
        stream = cameraStream;
      })
      .catch((error) => {
        console.log("error", error);
      });
  });

  onDestroy(() => {
    cameraPhoto?.stopCamera();
  });

  const handleTakePhoto = () => {
    if (!cameraPhoto) return;

    dataUri = cameraPhoto.getDataUri({
      sizeFactor: 1,
      imageType: IMAGE_TYPES.JPG,
      imageCompression: 0,
      isImageMirror: true,
    });
    submitted = true;
  };
</script>

<div class="flex justify-center p-8 sm:p-16 bg-gray-900 h-screen max-h-screen">
  <div
    class="text-center flex h-full w-full justify-center items-center flex-col max-w-lg"
  >
    <BackButton on:click={() => console.log("back")} />
    <div class="flex justify-center items-center">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        class="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
        bind:this={video}
        autoplay
        playsinline
      />
    </div>
    <div class="text-center flex flex-col items-center justify-between" style="max-height: 90vh">
      <div class="z-10 mb-4">
        <h2 class="text-white font-bold text-lg mb-4">{title}</h2>
        <p class="text-gray-200">
          {paragraph}
        </p>
      </div>
      <Overlay {overlayType}/>
      <CameraButton on:click={handleTakePhoto} disabled={submitted} />
    </div>
  </div>
</div>
