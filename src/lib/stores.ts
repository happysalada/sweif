import { writable, derived } from 'svelte/store';

import { balancesFromTransactions } from '$lib/utils';

export const user = writable<User | undefined>();
export const transactions = writable<Transaction[]>([])
export const balances = derived(transactions, $transactions => balancesFromTransactions($transactions))

