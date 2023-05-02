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
