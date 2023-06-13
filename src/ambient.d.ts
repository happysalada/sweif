type DatabaseInfo = {
  url: string,
  database: string,
  namespace: string,
}

type User = {
  id: string,
  name: string,
  email: string,
  country: Country,
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


type DepositRequest = {
  type: "deposit_request",
  input_amount: string,
  input_currency: Currency,
  output_amount: string,
  output_currency: Currency,
  created_at: Date,
  confirmed_at: Date | undefined,
}

type Deposit = {
  deposit_request: DepositRequest,
  created_at: Date,
}

type WithdrawalRequest = {
  type: "withdrawal_request",
  input_amount: string,
  input_currency: Currency,
  output_amount: string,
  output_currency: Currency,
  created_at: Date,
  confirmed_at: Date | undefined,
}

type Withdrawal = {
  withdrawal_request: WithdrawalRequest,
  created_at: Date,
}

interface Conversion {
  type: "conversion",
  inputAmount: number,
  inputCurrency: Currency,
  outputAmount: number,
  outputCurrency: Currency,
  at: Date,
}

type Transaction = Deposit | Withdrawal;

type BankAccount = {
  id: string,
  name: string,
  country: Country,
  bank: Bank,
  iban: string,
  identificationNumber: string,
  ownerName: string,
  // TODO unify normal and db type
  currency: CurrencyDb
}

type CurrencyDb = {
  id: string,
  code: string,
  banks?: Bank[],
}

type Country = {
  id: string,
  name: string,
  alpha2: string,
  banks?: Bank[],
  currencies?: CurrencyDb[]
  identification_types?: IdentificationType[]
}

type Bank = {
  id: string,
  name: string,
}

type IdentificationType = {
  id: string,
  name: string
}
