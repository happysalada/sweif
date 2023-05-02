import { persisted } from 'svelte-local-storage-store'

export const user = persisted<User | null>('user',null);
