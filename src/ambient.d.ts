type User = {
  email: string,
  password: string,
  jwt: string,
}

type Currency = FiatCurrency | StableCoin;

type FxRate = {
  value: Decimal,
  direction: FxDirection
}


type RawFxRates = undefined | { "EUR-COP": number } | { "EURC-COP": number } | { "EURC-USDT": number } | { "EURC-EUR": number };

type RawFees = undefined | { [FiatCurrency.COP]: FeeRateRangeString[], [FiatCurrency.EUR]: FeeRateRangeString[], [StableCoin.EURC]: FeeRateRangeString[] }

type FeeRateRange = {
  min: Decimal,
  max: Decimal,
  rate: Decimal,
}

type FeeRateRangeString = {
  min: string,
  max: string,
  rate: string,
}

type BankAccount = {
  name: string,
  // TODO find or make an enum for it
  country: string,
  bankName: string,
  iban: string,
  identificationNumber: string,
  ownerName: string,
  currency: Currency
}

interface Deposit {
  type: "deposit",
  inputAmount: number,
  inputCurrency: Currency,
  outputAmount: number,
  outputCurrency: Currency,
  at: Date,
}

interface Withdrawal {
  type: "withdrawal",
  inputAmount: number,
  inputCurrency: Currency,
  outputAmount: number,
  outputCurrency: Currency,
  at: Date,
}

interface Conversion {
  type: "conversion",
  inputAmount: number,
  inputCurrency: Currency,
  outputAmount: number,
  outputCurrency: Currency,
  at: Date,
}

type Transaction = Deposit | Withdrawal | Conversion;
