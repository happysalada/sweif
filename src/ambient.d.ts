type User = {
  email: string,
  password: string,
  jwt: string,
}

type Currency = FiatCurrency | StableCoin;