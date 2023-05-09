// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	interface Platform {
		env?: {
			SERPAPI_KEY: string
		  PUBLIC_SURREAL_URL: string,
			PUBLIC_SURREAL_DATABASE: string,
			PUBLIC_SURREAL_NAMESPACE: string,
		}
	}
}
