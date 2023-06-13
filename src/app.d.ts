// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	interface Platform {
		env?: {
		  PUBLIC_SURREAL_URL: string,
			PUBLIC_SURREAL_DATABASE: string,
			PUBLIC_SURREAL_NAMESPACE: string,
			NTFY_URL: string,
			NTFY_CONTACT_TOPIC: string,
			NTFY_SIGNUP_TOPIC: string,
			NTFY_TRANSFER_TOPIC: string
			ELASTIC_EMAIL_API_KEY: string,
			PUBLIC_TUS_URL: string,
		}
	}
}
