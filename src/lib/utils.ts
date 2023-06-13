import { Decimal } from "decimal.js"
import { FiatCurrency, StableCoin } from "$lib/types";
import {
  PUBLIC_SURREAL_URL,
  PUBLIC_SURREAL_DATABASE,
  PUBLIC_SURREAL_NAMESPACE,
  PUBLIC_TUS_URL
} from '$env/static/public';
// import { Upload } from "tus-js-client";

export function databaseInfo(platform: App.Platform | undefined): DatabaseInfo {
  return {
    url: platform?.env?.PUBLIC_SURREAL_URL || PUBLIC_SURREAL_URL,
    database: platform?.env?.PUBLIC_SURREAL_DATABASE || PUBLIC_SURREAL_DATABASE,
    namespace: platform?.env?.PUBLIC_SURREAL_NAMESPACE || PUBLIC_SURREAL_NAMESPACE,
  }
}

export function balancesFromTransactions(transactions: Transaction[]): { [key: string]: Decimal } {
  return transactions.reduce((acc, transaction) => {
    // If the currency is already in the accumulator, add the amount to the existing total.
    // Otherwise, initialize the total for the currency to the current amount.
    if ("deposit_request" in transaction) {
      acc[transaction.deposit_request.output_currency.code] = new Decimal(acc[transaction.deposit_request.output_currency.code] || 0).add(transaction.deposit_request.output_amount);
    } else if ("withdrawal_request" in transaction) {
      acc[transaction.withdrawal_request.input_currency.code] = new Decimal(acc[transaction.withdrawal_request.input_currency.code] || 0).minus(transaction.withdrawal_request.input_amount);
    }
    return acc;
  }, {} as { [key: string]: Decimal })
}

export function humanReadableDate(date: Date): string {

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`
}

export const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function clickOutside(node: HTMLElement): { destroy: () => void } {
  const handleClick = (event: MouseEvent): void => {
    if (!node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

export function decimalToStringTable(table: FeeRateRange[]): FeeRateRangeString[] {
  return table.map(({ min, max, rate }) => ({ min: min.toString(), max: max.toString(), rate: rate.toString() }))
}

export function stringToDecimalTable(table: FeeRateRangeString[]): FeeRateRange[] {
  return table.map(({ min, max, rate }) => ({ min: new Decimal(min), max: new Decimal(max), rate: new Decimal(rate) }))
}

export function currencyFormat(value: Decimal, currency: Currency): string {
  return Intl.NumberFormat('en-US', {
    currency: (currency == FiatCurrency.EUR || currency == StableCoin.EURC) ? "EUR" : "USD",
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value.toNumber())
}

function dataURItoBlob(dataURI: string): Blob {
  // Split the Data URI into its components
  const splitDataURI = dataURI.split(',');
  const byteString = atob(splitDataURI[1]);

  // Create an ArrayBuffer to hold the bytes
  const arrayBuffer = new ArrayBuffer(byteString.length);

  // Create a Uint8Array view into the buffer
  const int8Array = new Uint8Array(arrayBuffer);

  // Copy the bytes from the byteString into the buffer
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  // Identify the mime type
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  // Generate a Blob from the bytes
  const blob = new Blob([arrayBuffer], { type: mimeString });

  return blob;
}

function blobToFile(blob: Blob, filename: string): File {
  return new File([blob], filename, { type: blob.type });
}

// export function uploadFile(fileName: string, dataUri: string) {
//   const blob = dataURItoBlob(dataUri);
//   const file = blobToFile(blob, fileName);
//   const upload = new Upload(file, {
//     endpoint: `${PUBLIC_TUS_URL}/files/`,
//     retryDelays: [0, 3000, 5000, 10000, 20000],
//     metadata: {
//       filename: file.name,
//       filetype: file.type,
//     },
//     onError: function(error: Error) {
//       console.log("Failed because: " + error);
//     },
//     onProgress: function(bytesUploaded: number, bytesTotal: number) {
//       const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
//       console.log(bytesUploaded, bytesTotal, percentage + "%");
//     },
//     onSuccess: function() {
//       console.log(
//         "Download %s from %s",
//         (upload.file as File).name,
//         upload.url
//       );
//     },
//   });

//   // Check if there are any previous uploads to continue.
//   upload.findPreviousUploads().then(function(previousUploads: any[]) {
//     // Found previous uploads so we select the first one.
//     if (previousUploads.length) {
//       upload.resumeFromPreviousUpload(previousUploads[0]);
//     }

//     // Start the upload
//     upload.start();
//   });
// };
