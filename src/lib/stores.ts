import { persisted } from 'svelte-local-storage-store'

import { StableCoin, FiatCurrency } from '$lib/types';

const initialBalance = {
  [StableCoin.EURC]: '0',
  [FiatCurrency.COP]: '0',
  [StableCoin.USDC]: '0',
  [StableCoin.USDT]: '0',
}

export const user = persisted<User | null>('user', null);

// make a copy of initial balance to not modify the initial variable
export const balances = persisted('balances', {...initialBalance})

export const bankAccounts = persisted<BankAccount[]>('bankAcounts', [])

export const transactions = persisted<Transaction[]>('transactions', [])