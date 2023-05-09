import { Decimal } from "decimal.js";

export const EUR_FEE_TABLE = [
  { min: new Decimal(0), max: new Decimal(199), rate: new Decimal(0.04) },
  { min: new Decimal(200), max: new Decimal(499), rate: new Decimal(0.03) },
  { min: new Decimal(500), max: new Decimal(999), rate: new Decimal(0.025) },
  { min: new Decimal(1000), max: new Decimal(2999), rate: new Decimal(0.021) },
  { min: new Decimal(3000), max: new Decimal(4999), rate: new Decimal(0.018) },
  { min: new Decimal(5000), max: new Decimal(9999), rate: new Decimal(0.015) },
  { min: new Decimal(10000), max: new Decimal(19999), rate: new Decimal(0.013) },
  { min: new Decimal(20000), max: new Decimal(200000000), rate: new Decimal(0.011) }
]

export const BANKS = [
  "BAN100",
  "BANCAMIA S.A",
  "BANCO AGRARIO",
  "BANCO AV VILLAS",
  "BANCO BBVA COLOMBIA S.A.",
  "BANCO CAJA SOCIAL",
  "BANCO COOPERATIVO COOPCENTRAL",
  "BANCO DAVIVIENDA",
  "BANCO DE BOGOTA",
  "BANCO DE OCCIDENTE",
  "BANCO FALABELLA",
  "BANCO FINANDINA S.A. BIC",
  "BANCO GNB SUDAMERIS",
  "BANCO ITAU",
  "BANCO PICHINCHA S.A",
  "BANCO POPULAR",
  "BANCO SANTANDER COLOMBIA",
  "BANCO SERFINANZA",
  "BANCO UNION antes GIROS",
  "BANCOLOMBIA",
  "BANCOOMEVA S.A.",
  "CFA COOPERATIVA FINANCIERA",
  "CITIBANK",
  "COLTEFINANCIERA",
  "CONFIAR COOPERATIVA FINANCIERA",
  "COOFINEP COOPERATIVA FINANCIERA",
  "COTRAFA",
  "DALE",
  "DAVIPLATA",
  "IRIS",
  "LULO BANK",
  "MOVII S.A.",
  "NEQUI",
  "RAPPIPAY",
  "SCOTIABANK COLPATRIA"
]

export const ONE_DAY = 60 * 60 * 24;
