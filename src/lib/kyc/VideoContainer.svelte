<script lang="ts">
  import CameraPhoto, {
    FACING_MODES,
    IMAGE_TYPES,
  } from "jslib-html5-camera-photo";
  import { onMount, onDestroy } from "svelte";

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
</script>

<div class="flex justify-center items-center">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video class="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover" bind:this={video} autoplay playsinline />
</div>
