<script lang="ts">
	import Logo from "$lib/Logo.svelte";
</script>
<div class="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="flex justify-center w-full">
			<Logo classes="h-12 w-20 rounded-lg h-full" />
		</div>
    <slot name="header" />
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <slot name="main" />
    </div>
  </div>
</div>
