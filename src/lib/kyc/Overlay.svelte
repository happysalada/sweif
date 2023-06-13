<script lang="ts">
  import type { OverlayType } from "$lib/kyc/types";
  export let overlayType: OverlayType;
</script>
<div class="overlay {overlayType}" />

<style>
  .overlay-container {
    display: flex;
    justify-content: center;
  }
  .overlay {
    z-index: 1;
    position: relative;
    -webkit-box-shadow: 0px 0px 0px 1000px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 0px 0px 0px 1000px rgba(0, 0, 0, 0.7);
    box-shadow: 0px 0px 0px 1000px rgba(0, 0, 0, 0.7);
    border: 3px solid #ffffff4d;
    width: 100%;
  }
  .overlay.card {
    border-radius: 12px;
    aspect-ratio: 5/3;
  }
  .overlay.passport {
    border-radius: 12px;
    aspect-ratio: 3/4;
    width: 90%;
    max-height: 60%;
  }
  .overlay.a4 {
    border-radius: 12px;
    aspect-ratio: 3/4;
    max-width: 80%;
  }
  .overlay.selfie {
    border-radius: 100%;
    aspect-ratio: 3/4;
    max-height: 80%;
    width: 80%;
  }
</style>
