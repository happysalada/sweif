<script lang="ts">
  import { monthNames, humanReadableDate } from "$lib/utils";

  export let text: string;
  export let color: string;
  export let at: Date;
</script>
<li>
  <div class="relative pb-8">
    <span
      class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
      aria-hidden="true"
    />
    <div class="relative flex space-x-3">
      <div>
        <span
          class="h-8 w-8 rounded-full bg-{color}-400 flex items-center justify-center ring-8 ring-white"
       >
          <slot></slot>
        </span>
      </div>
      <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
        <div>
          <p class="text-sm text-gray-500">{text}</p>
        </div>
        <div class="whitespace-nowrap text-right text-sm text-gray-500">
          <time datetime={humanReadableDate(at)}>{monthNames[at.getMonth()]} {String(at.getDate()).padStart(2, "0")}</time
          >
        </div>
      </div>
    </div>
  </div>
</li>
