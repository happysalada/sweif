import { Decimal } from "decimal.js";

export const EUR_FEE_TABLE = [
  { min: new Decimal(0), max: new Decimal(199.99), rate: new Decimal(0.04) },
  { min: new Decimal(200), max: new Decimal(499.99), rate: new Decimal(0.03) },
  { min: new Decimal(500), max: new Decimal(999.99), rate: new Decimal(0.025) },
  { min: new Decimal(1_000), max: new Decimal(2_999.99), rate: new Decimal(0.021) },
  { min: new Decimal(3_000), max: new Decimal(4_999.99), rate: new Decimal(0.018) },
  { min: new Decimal(5_000), max: new Decimal(9_999.99), rate: new Decimal(0.015) },
  { min: new Decimal(10_000), max: new Decimal(19_999.99), rate: new Decimal(0.013) },
  { min: new Decimal(20_000), max: new Decimal(200_000_000), rate: new Decimal(0.011) }
]

export const COP_FEE_TABLE = [
  { min: new Decimal(0), max: new Decimal(799_999.99), rate: new Decimal(0.04) },
  { min: new Decimal(800_000), max: new Decimal(1_999_999.99), rate: new Decimal(0.03) },
  { min: new Decimal(2_000_000), max: new Decimal(3_999_999.99), rate: new Decimal(0.025) },
  { min: new Decimal(4_000_000), max: new Decimal(11_999_999.99), rate: new Decimal(0.021) },
  { min: new Decimal(12_000_000), max: new Decimal(19_999_999.99), rate: new Decimal(0.018) },
  { min: new Decimal(20_000_000), max: new Decimal(39_999_999.99), rate: new Decimal(0.015) },
  { min: new Decimal(40_000_000), max: new Decimal(79_999_9999.99), rate: new Decimal(0.013) },
  { min: new Decimal(80_000_0000), max: new Decimal(100_000_000_000), rate: new Decimal(0.011) }
]

export const USD_FEE_TABLE = [
  { min: new Decimal(0), max: new Decimal(199.99), rate: new Decimal(0.04) },
  { min: new Decimal(200), max: new Decimal(499.99), rate: new Decimal(0.03) },
  { min: new Decimal(500), max: new Decimal(999.99), rate: new Decimal(0.025) },
  { min: new Decimal(1_000), max: new Decimal(2_999.99), rate: new Decimal(0.021) },
  { min: new Decimal(3_000), max: new Decimal(4_999.99), rate: new Decimal(0.018) },
  { min: new Decimal(5_000), max: new Decimal(9_999.99), rate: new Decimal(0.015) },
  { min: new Decimal(10_000), max: new Decimal(19_999.99), rate: new Decimal(0.013) },
  { min: new Decimal(20_000), max: new Decimal(200_000_000), rate: new Decimal(0.011) }
]

export const ONE_DAY: Readonly<number> = 60 * 60 * 24;
