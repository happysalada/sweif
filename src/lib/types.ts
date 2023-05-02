import type { Decimal } from "decimal.js"

export enum FormState {
  Ready,
  Submitted,
  Success,
  Error,
}

export enum FiatCurrency {
  COP = 'COP',
  EUR = 'EUR',
}

export enum StableCoin {
  EURC = 'EURC',
  USDC = 'USDC',
  USDT = 'USDT',
}

export enum FxDirection {
  Multiply = "Multiply",
  Divide = "Divide"
}

