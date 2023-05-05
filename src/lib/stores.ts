import { Decimal } from 'decimal.js';
import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store';

import { StableCoin, FiatCurrency } from '$lib/types';

const initialBalance = {
  [StableCoin.EURC]: new Decimal(0),
  [FiatCurrency.COP]: new Decimal(0),
  [StableCoin.USDC]: new Decimal(0),
  [StableCoin.USDT]: new Decimal(0),
}

export const user = persisted<User | null>('user', null);

// make a copy of initial balance to not modify the initial variable
export const balances = writable({...initialBalance})

export const bankAccounts = writable<BankAccount[]>([])

export const transactions = writable<Transaction[]>([])