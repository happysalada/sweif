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


type RawFxRates = undefined | { "EUR-COP": number } | { "EURC-COP": number } | { "EURC-USDT": number };

type RawFees = undefined | { [FiatCurrency.COP]: FeeRateRangeString[], [FiatCurrency.EUR]: FeeRateRangeString[], [StableCoin.EURC]: FeeRateRangeString[]}

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
